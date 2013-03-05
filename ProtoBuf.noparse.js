/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license ProtoBuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ProtoBuf.js for details
 */
(function(global) {
    
    function loadProtoBuf(ByteBuffer) {
        if (!ByteBuffer || !ByteBuffer.calculateUTF8String || !ByteBuffer.zigZagEncode32) {
            // Usually not neccessary, but to be sure...
            if (typeof dcodeIO != 'undefined' && dcodeIO.ByteBuffer) {
                ByteBuffer = dcodeIO.ByteBuffer;
            }
            if (!ByteBuffer && typeof require == 'function') {
                ByteBuffer = require("ByteBuffer");
            }
            if (!ByteBuffer) throw(new Error("ProtoBuf.js requires ByteBuffer.js >=1.1.0: Get it at https://github.com/dcodeIO/ByteBuffer.js"));
        }

        // Object.create polyfill
        // ref: https://developer.mozilla.org/de/docs/JavaScript/Reference/Global_Objects/Object/create
        if (!Object.create) {
            /** @expose */
            Object.create = function (o) {
                if (arguments.length > 1) {
                    throw new Error('Object.create implementation only accepts the first parameter.');
                }
                function F() {}
                F.prototype = o;
                return new F();
            };
        }

        /**
         * The ProtoBuf namespace.
         * @exports ProtoBuf
         * @namespace
         * @expose
         */
        var ProtoBuf = {};
        
        /**
         * ProtoBuf.js version.
         * @type {Object.<string, string>}
         */
        ProtoBuf.VERSION = "0.9.0";
        /**
         * Wire types.
         * @type {Object.<string,number>}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES = {};

        /**
         * Varint wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.VARINT = 0;

        /**
         * Fixed 64 bits wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS64 = 1;

        /**
         * Length delimited wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.LDELIM = 2;

        /**
         * Start group wire type.
         * @type {number}
         * @deprecated
         * @expose
         */
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

        /**
         * End group wire type.
         * @type {number}
         * @deprecated
         * @expose
         */
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

        /**
         * Fixed 32 bits wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS32 = 5;

        /**
         * Native types.
         * @dict
         * @type {Object.<string,{name: string, wireType: number}>}
         * @const
         * @expose
         */
        ProtoBuf.TYPES = {
            // According to the protobuf spec.
            "int32": {
                name: "int32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "uint32": {
                name: "uint32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "sint32": {
                name: "sint32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "bool": {
                name: "bool",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "double": {
                name: "double",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
            },
            "string": {
                name: "string",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            },
            "bytes": {
                name: "bytes",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            },
            "fixed32": {
                name: "fixed32",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "sfixed32": {
                name: "sfixed32",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "float": {
                name: "float",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "enum": {
                name: "enum",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "message": {
                name: "message",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            }
        };
        
        /**
         * @alias ProtoBuf.Lang
         * @expose
         */
        ProtoBuf.Lang = (function() {
            "use strict";
            
            /**
             * ProtoBuf Language.
             * @exports ProtoBuf.Lang
             * @type {Object.<string,string|RegExp>}
             * @namespace
             * @private
             * @expose
             */
            var Lang = { // Look, so cute!
                OPEN: "{",
                CLOSE: "}",
                OPTOPEN: "[",
                OPTCLOSE: "]",
                OPTEND: ",",
                EQUAL: "=",
                END: ";",
        
                DELIM: /[\s\{\}=;\[\],"]/g,
                KEYWORD: /package|option|message|enum/,
                RULE: /required|optional|repeated/,
                TYPE: /double|float|int32|uint32|sint32|fixed32|sfixed32|bool|string|bytes/,
                NAME: /[a-zA-Z][a-zA-Z_0-9]*/,
                TYPEDEF: /[a-zA-Z](\.?[a-zA-Z_0-9])*/,
                TYPEREF: /\.?[a-zA-Z](\.?[a-zA-Z_0-9])*/,
                NUMBER: /-?([1-9][0-9]*)|0/,
                ID: /[0-9]+/,
                COMMENT: "//",
                WHITESPACE: /\s/,
                STRING: /"([^"\\]*(\\.[^"\\]*)*)"/g,
                STRINGOPEN: '"',
                STRINGCLOSE: '"'
            };
            
            return Lang;
        })();
                
        // This build of ProtoBuf.js does not include DotProto support.
        
        /**
         * @alias ProtoBuf.Reflect
         * @expose
         */
        ProtoBuf.Reflect = (function(ProtoBuf) {
            "use strict";
            
            /**
             * @exports ProtoBuf.Reflect
             * @namespace
             */
            var Reflect = {};
        
            /**
             * Constructs a Reflect base class.
             * @exports ProtoBuf.Reflect.T
             * @constructor
             * @param {ProtoBuf.Reflect.T} parent Parent object
             * @param {string} name Object name
             */
            var T = function(parent, name) {
                /**
                 * Parent object.
                 * @type {ProtoBuf.Reflect.T|null}
                 * @expose
                 */
                this.parent = parent;
        
                /**
                 * Object name in namespace.
                 * @type {string}
                 * @expose
                 */
                this.name = name;
        
                /**
                 * Resolved type reference.
                 * @type {ProtoBuf.Reflect.T|null}
                 * @expose
                 */
                this.resolvedType = null;
            };
        
            /**
             * Returns a string representation of this Reflect object (its fully qualified name).
             * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
             * @return String representation
             * @expose
             */
            T.prototype.toString = function(includeClass) {
                var name = this.name;
                var ptr = this;
                do {
                    ptr = ptr.parent;
                    if (ptr == null) break;
                    name = ptr.name+"."+name;
                } while (true);
                if (includeClass) {
                    if (this instanceof Reflect.Message) {
                        name = "Message "+name;
                    } else if (this instanceof Message.Field) {
                        name = "Message.Field "+name;
                    } else if (this instanceof Enum) {
                        name = "Enum "+name;
                    } else if (this instanceof Enum.Value) {
                        name = "Enum.Value "+name;
                    } else if (this instanceof Namespace) {
                        name = "Namespace "+name;
                    }
                }
                return name;
            };
        
            /**
             * Builds this type.
             * @throws {string} Exception if this type cannot be built directly
             * @expose
             */
            T.prototype.build = function() {
                throw(this.toString(true)+" cannot be built directly");
            };
        
            /**
             * @alias ProtoBuf.Reflect.T
             * @expose
             */
            Reflect.T = T;
        
            /**
             * Constructs a new Namespace.
             * @exports ProtoBuf.Reflect.Namespace
             * @param {?Reflect.Reflect.Namespace} parent Parent
             * @param {string} name
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Namespace = function(parent, name) {
                T.call(this, parent, name);
        
                /**
                 * Children inside the namespace.
                 * @type {Array.<ProtoBuf.Reflect.T>}
                 */
                this.children = [];
            };
        
            // Extends T
            Namespace.prototype = Object.create(T.prototype);
        
            /**
             * Returns an array of the namespace's children.
             * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
             * @return {Array.<ProtoBuf.Reflect.T>}
             * @expose
             */
            Namespace.prototype.getChildren = function(type) {
                type = type || null;
                if (type == null) {
                    return this.children.slice();
                }
                var children = [];
                for (var i=0; i<this.children.length; i++) {
                    if (this.children[i] instanceof type) {
                        children.push(this.children[i]);
                    }
                }
                return children;
            };
        
            /**
             * Adds a child to the namespace.
             * @param {ProtoBuf.Reflect.T} child Child
             * @throws {Error} If the child cannot be added (duplicate)
             * @expose
             */
            Namespace.prototype.addChild = function(child) {
                if (this.hasChild(child.name)) {
                    throw(new Error("Duplicate name in namespace "+this.toString(true)+": "+child.name));
                }
                this.children.push(child);
            };
        
            /**
             * Tests if this namespace has a child with the specified name.
             * @param {string|number} nameOrId Child name or id
             * @returns {boolean} true if there is one, else false
             * @expose
             */
            Namespace.prototype.hasChild = function(nameOrId) {
                var i;
                if (typeof nameOrId == 'number') {
                    for (i=0; i<this.children.length; i++) if (this.children[i] instanceof Message.Field && this.children[i].id == nameOrId) return true;
                } else {
                    for (i=0; i<this.children.length; i++) if (this.children[i].name == nameOrId) return true;
                }
                return false;
            };
        
            /**
             * Gets a child by its name.
             * @param {string|number} nameOrId Child name or id
             * @return {?ProtoBuf.Reflect.T} The child or null if not found
             * @expose
             */
            Namespace.prototype.getChild = function(nameOrId) {
                var i;
                if (typeof nameOrId == 'number') {
                    for (i=0; i<this.children.length; i++) if (this.children[i] instanceof Message.Field && this.children[i].id == nameOrId) return this.children[i];
                } else {
                    for (i=0; i<this.children.length; i++) if (this.children[i].name == nameOrId) return this.children[i];
                }
                return null;
            };
        
            /**
             * Resolves a reflect object inside of this namespace.
             * @param {string} qn Qualified name to resolve
             * @return {ProtoBuf.Reflect.Namespace|null} The resolved type or null if not found
             * @expose
             */
            Namespace.prototype.resolve = function(qn) {
                var part = qn.split(".");
                var ptr = this, i=0;
                if (part[i] == "") { // Fully qualified name, e.g. ".My.Message'
                    while (ptr.parent != null) {
                        ptr = ptr.parent;
                    }
                    i++;
                }
                var child;
                do {
                    do {
                        child = ptr.getChild(part[i]);
                        if (!child || !(child instanceof Reflect.T)) {
                            ptr = null;
                            break;
                        }
                        ptr = child; i++;
                    } while (i < part.length);
                    if (ptr != null) break; // Found
                    // Else search the parent
                    if (this.parent !== null) {
                        return this.parent.resolve(qn);
                    }
                } while (ptr != null);
                return ptr;
            };
        
            /**
             * Builds the namespace and returns the built counterpart.
             * @return {Object.<string,Function|Object>} Built namespace
             * @expose
             */
            Namespace.prototype.build = function() {
                var ns = {};
                var children = this.getChildren(), child;
                for (var i=0; i<children.length; i++) {
                    child = children[i];
                    if (child instanceof Namespace) {
                        ns[child.name] = child.build();
                    }
                }
                return ns;
            };
        
            /**
             * @alias ProtoBuf.Reflect.Namespace
             * @expose
             */
            Reflect.Namespace = Namespace;
        
            /**
             * Constructs a new Message.
             * @exports ProtoBuf.Reflect.Message
             * @param {!ProtoBuf.Reflect.Message|!ProtoBuf.Reflect.Namespace} parent Parent message or namespace
             * @param {string} name Message name
             * @constructor
             * @extends ProtoBuf.Reflect.Namespace
             */
            var Message = function(parent, name) {
                Namespace.call(this, parent, name);
        
                /**
                 * Last message build.
                 * @type {ProtoBuf.Builder.Message|null}
                 * @expose
                 */
                this.built = null;
            };
        
            // Extends Namespace
            Message.prototype = Object.create(Namespace.prototype);
        
            /**
             * Builds the message and returns the built counterpart, which is a fully functional class.
             * @see ProtoBuf.Builder.Message
             * @return {Function} Message class
             * @throws {Error} If the message cannot be built
             * @expose
             */
            Message.prototype.build = function() {
                // We need to create a prototyped Message class in an isolated scope
                var clazz = (function(Reflect, T) {
                    var fields = T.getChildren(Reflect.Message.Field);
        
                    /**
                     * Constructs a new Message.
                     * @name ProtoBuf.Builder.Message
                     * @class Barebone of all built messages. This class does not actually exist and is here for
                     * documentation purposes only.
                     * @param {Object.<string,*>} values Preset values
                     * @constructor
                     * @throws {Error} If the message cannot be created
                     */
                    var Message = null;
                    eval("Message = function "+T.name+"() { __construct.apply(this, arguments); };"); // Any better way to create a named function?
                    var __construct = function(values) {
                        var i, field;
        
                        // Create fields on the object itself to allow setting and getting through Message#fieldname
                        for (i=0; i<fields.length; i++) {
                            field = fields[i];
                            this[field.name] = (field.repeated) ? [] : null;
                        }
                        // Set the default values
                        for (i=0; i<fields.length; i++) {
                            field = fields[i];
                            if (typeof field.options['default'] != 'undefined') {
                                try {
                                    this.set(field.name, field.options['default']); // Should not throw
                                } catch (e) {
                                    throw(new Error("[INTERNAL ERROR] "+e));
                                }
                            }
                        }
                        // Set field values from a values object
                        if (typeof values == 'object' && /* not another Message */ typeof values.encode != 'function') {
                            var keys = Object.keys(values);
                            for (i=0; i<keys.length; i++) {
                                this.set(keys[i], values[keys[i]]); // May throw
                            }
                            // Else set field values from arguments, in correct order
                        } else {
                            for (i=0; i<arguments.length; i++) {
                                if (i<fields.length) {
                                    this.set(fields[i].name, arguments[i]); // May throw
                                }
                            }
                        }
                    };
        
                    /**
                     * Adds a value to a repeated field.
                     * @name ProtoBuf.Builder.Message#add
                     * @function
                     * @param {string} key Field name
                     * @param {*} value Value to add
                     * @throws {string} If the value cannot be added
                     * @expose
                     */
                    Message.prototype.add = function(key, value) {
                        var field = T.getChild(key);
                        if (!field) {
                            throw(this+"#"+key+" is undefined");
                        }
                        if (!(field instanceof Reflect.Message.Field)) {
                            throw(this+"#"+key+" is not a field: "+field.toString(true)); // May throw if it's an enum or embedded message
                        }
                        if (!field.repeated) {
                            throw(this+"#"+key+" is not a repeated field");
                        }
                        if (this[field.name] === null) this[field.name] = [];
                        this[field.name].push(field.verifyValue(value));
                    };
        
                    /**
                     * Sets a field value.
                     * @name ProtoBuf.Builder.Message#set
                     * @function
                     * @param {string} key Key
                     * @param {*} value Value to set
                     * @throws {string} If the value cannot be set
                     * @expose
                     */
                    Message.prototype.set = function(key, value) {
                        var field = T.getChild(key);
                        if (!field) {
                            throw(this+"#"+key+" is not a field: undefined");
                        }
                        if (!(field instanceof Reflect.Message.Field)) {
                            throw(this+"#"+key+" is not a field: "+field.toString(true));
                        }
                        this[field.name] = field.verifyValue(value); // May throw
                    };
        
                    /**
                     * Gets a value.
                     * @name ProtoBuf.Builder.Message#get
                     * @function
                     * @param {string} key Key
                     * @return {*} Value
                     * @throws {string} If there is no such field
                     * @expose
                     */
                    Message.prototype.get = function(key) {
                        var field = T.getChild(key);
                        if (!field || !(field instanceof Reflect.Message.Field)) {
                            throw(this+"#"+key+" is not a field: undefined");
                        }
                        if (!(field instanceof Reflect.Message.Field)) {
                            throw(this+"#"+key+" is not a field: "+field.toString(true));
                        }
                        return this[field.name];
                    };
        
                    // Getters and setters
        
                    for (var i=0; i<fields.length; i++) {
                        var field = fields[i];
                        
                        (function(field) {
                            // set/get[SomeValue]
                            var Name = field.name.replace(/(_[a-zA-Z])/g,
                                function(match) {
                                    return match.toUpperCase().replace('_','');
                                }
                            );
                            Name = Name.substring(0,1).toUpperCase()+Name.substring(1);
            
                            // set/get_[some_value]
                            var name = field.name.replace(/([A-Z])/g,
                                function(match) {
                                    return "_"+match;
                                }
                            );
            
                            /**
                             * Sets a value. This method is present for each field, but only if there is no name conflict with
                             * another field.
                             * @name ProtoBuf.Builder.Message#set[SomeField]
                             * @function
                             * @param {*} value Value to set
                             * @abstract
                             * @throws {string} If the value cannot be set
                             */
                            if (!T.hasChild("set"+Name)) {
                                Message.prototype["set"+Name] = function(value) {
                                    this.set(field.name, value);
                                }
                            }
            
                            /**
                             * Sets a value. This method is present for each field, but only if there is no name conflict with
                             * another field.
                             * @name ProtoBuf.Builder.Message#set_[some_field]
                             * @function
                             * @param {*} value Value to set
                             * @abstract
                             * @throws {string} If the value cannot be set
                             */
                            if (!T.hasChild("set_"+name)) {
                                Message.prototype["set_"+name] = function(value) {
                                    this.set(field.name, value);
                                };
                            }
            
                            /**
                             * Gets a value. This method is present for each field, but only if there is no name conflict with
                             * another field.
                             * @name ProtoBuf.Builder.Message#get[SomeField]
                             * @function
                             * @abstract
                             * @return {*} The value
                             */
                            if (!T.hasChild("get"+Name)) {
                                Message.prototype["get"+Name] = function() {
                                    return this.get(field.name);
                                }
                            }
            
                            /**
                             * Gets a value. This method is present for each field, but only if there is no name conflict with
                             * another field.
                             * @name ProtoBuf.Builder.Message#get_[some_field]
                             * @function
                             * @return {*} The value
                             * @abstract
                             */
                            if (!T.hasChild("get_"+name)) {
                                Message.prototype["get_"+name] = function() {
                                    return this.get(field.name);
                                };
                            }
                            
                        })(field);
                    }
        
                    // En-/decoding
        
                    /**
                     * Encodes the message.
                     * @name ProtoBuf.Builder.Message#encode
                     * @function
                     * @param {ByteBuffer=} buffer ByteBuffer to encode to. Will create a new one if omitted.
                     * @return {ByteBuffer} Encoded message
                     * @throws {string} If the message cannot be encoded
                     * @expose
                     */
                    Message.prototype.encode = function(buffer) {
                        buffer = buffer || new ByteBuffer();
                        T.encode(this, buffer);
                        return buffer.flip();
                    };
        
                    /**
                     * Directly encodes the message to an ArrayBuffer.
                     * @name ProtoBuf.Builder.Message#toArrayBuffer
                     * @function
                     * @return {ArrayBuffer} Encoded message as ArrayBuffer
                     * @throws {string} If the message cannot be encoded
                     * @expose
                     */
                    Message.prototype.toArrayBuffer = function() {
                        return this.encode().toArrayBuffer();
                    };
        
                    /**
                     * Decodes the message from the specified ByteBuffer.
                     * @name ProtoBuf.Builder.Message.decode
                     * @function
                     * @param {ByteBuffer} buffer ByteBuffer to decode from
                     * @return {ProtoBuf.Builder.Message} Decoded message
                     * @throws {string} If the message cannot be decoded
                     * @expose
                     */
                    Message.decode = function(buffer) {
                        buffer = buffer ? (buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer)) : new ByteBuffer();
                        return T.decode(buffer);
                    };
        
                    // Utility
        
                    /**
                     * Returns a string representation of this Message.
                     * @name ProtoBuf.Builder.Message#toString
                     * @function
                     * @return {string} String representation as of ".Fully.Qualified.MessageName"
                     * @expose
                     */
                    Message.prototype.toString = function() {
                        return T.toString();
                    };
        
                    return Message;
        
                })(Reflect, this);
        
                // Static enums and prototyped sub-messages
                var children = this.getChildren();
                for (var i=0; i<children.length; i++) {
                    if (children[i] instanceof Enum) {
                        clazz[children[i]['name']] = children[i].build();
                    } else if (children[i] instanceof Message) {
                        clazz[children[i]['name']] = children[i].build();
                    } else if (children[i] instanceof Message.Field) {
                        // Ignore
                    } else {
                        throw(new Error("Illegal reflect child of "+this.toString(true)+": "+children[i].toString(true)));
                    }
                }
                return this.built = clazz;
            };
        
            /**
             * Encodes a built message's contents to the specified buffer.
             * @param {ProtoBuf.Builder.Message} message Built message to encode
             * @param {ByteBuffer} buffer BufferBuffer to write to
             * @throws {string} If the message cannot be encoded
             * @expose
             */
            Message.prototype.encode = function(message, buffer) {
                var fields = this.getChildren(Message.Field);
                for (var i=0; i<fields.length; i++) {
                    fields[i].encode(message.get(fields[i].name), buffer);
                }
            };
        
            /**
             * Decodes an encoded message and returns the decoded message.
             * @param {ByteBuffer} buffer ByteBuffer to decode from
             * @param {number=} length Message length. Defaults to decode all the available data.
             * @return {ProtoBuf.Builder.Message} Decoded message
             * @throws {Error} If the message cannot be decoded
             * @expose
             */
            Message.prototype.decode = function(buffer, length) {
                length = length || -1;
                var start = buffer.offset;
                var msg = new (this.built)();
                while (buffer.offset < start+length || (length == -1 && buffer.remaining() > 0)) {
                    var tag = buffer.readVarint32();
                    var wireType = tag & 0x07,
                        id = tag >> 3;
                    var field = this.getChild(id); // Message.Field only
                    if (!field) {
                        throw(new Error("Illegal field id in "+this.toString(true)+"#decode: "+id));
                    }
                    msg.set(field.name, field.decode(wireType, buffer));
                }
                return msg;
            };
        
            /**
             * @alias ProtoBuf.Reflect.Message
             * @expose
             */
            Reflect.Message = Message;
        
            /**
             * Constructs a new Message Field.
             * @exports ProtoBuf.Reflect.Message.Field
             * @param {ProtoBuf.Reflect.Message} message Message reference
             * @param {string} rule Rule, one of requried, optional, repeated
             * @param {string} type Data type, e.g. int32
             * @param {string} name Field name
             * @param {string} id Unique field id
             * @param {Object.<string.*>=} options Options
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Field = function(message, rule, type, name, id, options) {
                T.call(this, message, name);
        
                /**
                 * Message field required flag.
                 * @type {boolean}
                 * @expose
                 */
                this.required = rule == "required";
        
                /**
                 * Message field repeated flag.
                 * @type {boolean}
                 * @expose
                 */
                this.repeated = rule == "repeated";
        
                /**
                 * Message field type. Type reference string if unresolved, protobuf type if resolved.
                 * @type {string|{name: string, wireType: number}
                 * @expose
                 */
                this.type = type;
        
                /**
                 * Unique message field id.
                 * @type {number}
                 * @expose
                 */
                this.id = id;
        
                /**
                 * Message field options.
                 * @type {!Object.<string,*>}
                 * @dict
                 * @expose
                 */
                this.options = options || {};
            };
        
            // Extends T
            Field.prototype = Object.create(T.prototype);
        
            /**
             * Checks if the given value can be set for this field.
             * @param {*} value Value to check
             * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
             * @return {*} Verified, maybe adjusted, value
             * @throws {Error} If the value cannot be set for this field
             * @expose
             */
            Field.prototype.verifyValue = function(value, skipRepeated) {
                skipRepeated = skipRepeated || false;
                if (value === null) { // NULL values for optional fields
                    if (this.required) {
                        throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (required)"));
                    }
                    return null;
                }
                var i, values;
                if (this.repeated && !skipRepeated) { // Repeated values as arrays
                    if (!(value instanceof Array)) {
                        throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (not an array)"));
                    }
                    var res = [];
                    for (i=0; i<value.length; i++) {
                        res.push(this.verifyValue(value[i], true));
                    }
                    return res;
                }
                if (!this.repeated && value instanceof Array) {
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (is array)"));
                }
                if (this.type != ProtoBuf.TYPES["message"] && value instanceof Object) {
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (is object)"));
                }
                if (this.type == ProtoBuf.TYPES["int32"] || this.type == ProtoBuf.TYPES["sint32"] ||
                    this.type == ProtoBuf.TYPES["fixed32"] || this.type == ProtoBuf.TYPES["sfixed32"]) {
                    return parseInt(value, 10);
                }
                if (this.type == ProtoBuf.TYPES["uint32"]) {
                    value = parseInt(value, 10);
                    if (value < 0) {
                        throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (must not be negative)"));
                    }
                    return value;
                }
                if (this.type == ProtoBuf.TYPES["bool"]) {
                    return !!value;
                }
                if (this.type == ProtoBuf.TYPES["float"] || this.type == ProtoBuf.TYPES["double"]) {
                    return parseFloat(value);
                }
                if (this.type == ProtoBuf.TYPES["string"]) {
                    return ""+value;
                }
                if (this.type == ProtoBuf.TYPES["bytes"]) {
                    return ByteBuffer.wrap(value);
                }
                if (this.type == ProtoBuf.TYPES["enum"]) {
                    var values = this.resolvedType.getChildren(Enum.Value);
                    for (i=0; i<values.length; i++) {
                        if (values[i].name == value) {
                            return values[i].id;
                        } else if (values[i].id == value) {
                            return values[i].id;
                        }
                    }
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (not a valid enum value)"));
                }
                if (this.type == ProtoBuf.TYPES["message"]) {
                    if (value instanceof this.resolvedType.built) {
                        return value;
                    }
                    if (typeof value == 'object') { // Let's try to create one from keys and values
                        return new (this.resolvedType.built)(value); // May throw for a hundred of reasons
                    }
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (not an instance of "+this.resolvedType+")"));
                }
                // We should never end here
                throw(new Error("[INTERNAL ERROR] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")"));
            };
        
            /**
             * Encodes the specified field value to the specified buffer.
             * @param {*} value Field value
             * @param {ByteBuffer} buffer ByteBuffer to encode to
             * @throws {Error} If the field cannot be encoded
             * @expose
             */
            Field.prototype.encode = function(value, buffer) {
                value = this.verifyValue(value); // May throw
                if (this.type == null || typeof this.type != 'object') {
                    throw(new Error("[INTERNAL ERROR] Unresolved type in "+this.toString(true)+": "+this.type));
                }
                if (value === null) return; // Optional omitted
                try {
                    if (this.repeated) {
                        var i;
                        if (this.options["packed"]) {
                            // "All of the elements of the field are packed into a single key-value pair with wire type 2
                            // (length-delimited). Each element is encoded the same way it would be normally, except without a
                            // tag preceding it." 
                            buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                            for (i=0; i<value.length; i++) {
                                this.encodeValue(value[i], buffer);
                            }
                        } else {
                            // "If your message definition has repeated elements (without the [packed=true] option), the encoded
                            // message has zero or more key-value pairs with the same tag number"
                            for (i=0; i<value.length; i++) {
                                buffer.writeVarint32((this.id << 3) | this.type.wireType);
                                this.encodeValue(value[i], buffer);
                            }
                        }
                    } else {
                        buffer.writeVarint32((this.id << 3) | this.type.wireType);
                        this.encodeValue(value, buffer);
                    }
                } catch (e) {
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")"));
                }
            };
        
            /**
             * Decode the field value from the specified buffer.
             * @param {number} wireType Wire type
             * @param {ByteBuffer} buffer ByteBuffer to decode from
             * @return {*} Decoded value
             * @throws {Error} If the field cannot be decoded
             * @expose
             */
            Field.prototype.decode = function(wireType, buffer) {
                var value, nBytes;
                if (wireType != this.type.wireType) {
                    throw(new Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)"));
                }
                if (this.type == ProtoBuf.TYPES["int32"]) {
                    return buffer.readVarint32();
                } else if (this.type == ProtoBuf.TYPES["uint32"]) {
                    value = buffer.readVarint32();
                    UINT32[0] = value;
                    return UINT32[0];
                } else if (this.type == ProtoBuf.TYPES["sint32"]) {
                    return buffer.readZigZagVarint32();
                } else if (this.type == ProtoBuf.TYPES["bool"]) {
                    return !!buffer.readVarint32();
                } else if (this.type == ProtoBuf.TYPES["enum"]) {
                    return buffer.readVarint32(); // The following Builder.Message#set will already throw
                } else if (this.type == ProtoBuf.TYPES["double"]) {
                    return buffer.readDouble();
                } else if (this.type == ProtoBuf.TYPES["string"]){
                    return buffer.readVString();
                } else if (this.type == ProtoBuf.TYPES["bytes"]) {
                    nBytes = buffer.readVarint32();
                    value = buffer.clone(); // Offset already set
                    value.length = value.offset+nBytes;
                    return value;
                } else if (this.type == ProtoBuf.TYPES["message"]) {
                    nBytes = buffer.readVarint32();
                    return this.resolvedType.decode(buffer, nBytes);
                } else if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated) {
                    nBytes = buffer.readVarint32();
                    nBytes = buffer.offset + nBytes; // Limit
                    var values = [];
                    while (buffer.offset < nBytes) {
                        this.decode(this.type.wireType, buffer);
                    }
                    return values;
                } else if (this.type == ProtoBuf.TYPES["fixed32"]) {
                    return buffer.readInt32();
                } else if (this.type == ProtoBuf.TYPES["sfixed32"]) {
                    return ByteBuffer.zigZagDecode32(buffer.readUint32());
                } else if (this.type == ProtoBuf.TYPES["float"]) {
                    return buffer.readFloat();
                } else {
                    // We should never end here
                    throw(new Error("[INTERNAL ERROR] Illegal wire type for "+this.toString(true)+": "+wireType));
                }
            };
        
            /**
             * Encodes a value to the specified buffer. Does not encode the key.
             * @param {*} value Field value
             * @param {ByteBuffer} buffer ByteBuffer to encode to
             * @throws {Error} If the value cannot be encoded
             * @expose
             */
            Field.prototype.encodeValue = function(value, buffer) {
                if (value === null) return; // Nothing to encode
                // Tag has already been written
                if (this.type == ProtoBuf.TYPES["int32"] || this.type == ProtoBuf.TYPES["uint32"] || this.type == ProtoBuf.TYPES["fixed32"]) {
                    buffer.writeVarint32(value);
                } else if (this.type == ProtoBuf.TYPES["sint32"] || this.type == ProtoBuf.TYPES["sfixed32"]) {
                    buffer.writeVarint32(ByteBuffer.zigZagEncode32(value));
                } else if (this.type == ProtoBuf.TYPES["bool"]) {
                    buffer.writeVarint32(value ? 1 : 0);
                } else if (this.type == ProtoBuf.TYPES["enum"]) {
                    buffer.writeVarint32(value);
                } else if (this.type == ProtoBuf.TYPES["float"]) {
                    buffer.writeFloat32(value);
                } else if (this.type == ProtoBuf.TYPES["double"]) {
                    buffer.writeFloat64(value);
                } else if (this.type == ProtoBuf.TYPES["string"]) {
                    buffer.writeVString(value);
                } else if (this.type == ProtoBuf.TYPES["bytes"]) {
                    if (value.offset > value.length) { // Forgot to flip?
                        buffer = buffer.clone().flip();
                    }
                    buffer.writeVarint32(value.remaining());
                    buffer.append(value);
                } else if (this.type == ProtoBuf.TYPES["message"]) {
                    // We do not know the length of the embedded message yet. To avoid creating a second buffer, let's assume
                    // the length varint might consist of one byte and encode the embedded message to the current offset+1.
                    // When we know the length and it is one byte long, all we have to do is to write the length varint. If
                    // it's longer than one byte, we need to copy. Finally we did it all with just one buffer.
                    var start = buffer.offset;
                    buffer.writeUint8(0x00); // Placeholder (calls ensureCapacity)
                    this.resolvedType.encode(value, buffer);
                    var messageBytes = buffer.offset-start-1;
                    var sizeBytes = ByteBuffer.calculateVarint32(messageBytes);
                    if (sizeBytes > 1) { // We need to copy
                        var bb = buffer.clone();
                        bb.offset -= messageBytes;
                        buffer.append(bb.flip(), start-1+sizeBytes);
                    }
                    buffer.writeVarint32(messageBytes, start);
                } else {
                    // We should never end here
                    throw(new Error("[INTERNAL ERROR] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)"));
                }
            };
        
            /**
             * @alias ProtoBuf.Reflect.Message.Field
             * @expose
             */
            Reflect.Message.Field = Field;
        
            /**
             * Constructs a new Enum.
             * @exports ProtoBuf.Reflect.Enum
             * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
             * @param {string} name Enum name
             * @constructor
             * @extends ProtoBuf.Reflect.Namespace
             */
            var Enum = function(parent, name) {
                Namespace.call(this, parent, name);
        
                /**
                 * Last enum build.
                 * @type {Object.<string,number>|null}
                 * @expose
                 */
                this.built = null;
            };
        
            // Extends Namespace
            Enum.prototype = Object.create(Namespace.prototype);
        
            /**
             * Builds this enum and returns the built counterpart.
             * @return {Object<string,*>}
             * @expose
             */
            Enum.prototype.build = function() {
                var enm = {};
                var values = this.getChildren(Enum.Value);
                for (var i=0; i<values.length; i++) {
                    enm[values[i]['name']] = values[i]['id'];
                }
                return this.built = enm;
            };
        
            /**
             * @alias ProtoBuf.Reflect.Enum
             * @expose
             */
            Reflect.Enum = Enum;
        
            /**
             * Constructs a new Enum Value.
             * @exports ProtoBuf.Reflect.Enum.Value
             * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
             * @param {string} name Field name
             * @param {number} id Unique field id
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Value = function(enm, name, id) {
                T.call(this, enm, name);
        
                /**
                 * Unique enum value id.
                 * @type {number}
                 * @expose
                 */
                this.id = id;
            };
        
            // Extends T
            Value.prototype = Object.create(T.prototype);
        
            /**
             * @alias ProtoBuf.Reflect.Enum.Value
             * @expose
             */
            Reflect.Enum.Value = Value;
        
            return Reflect;
        })(ProtoBuf);
                
        /**
         * @alias ProtoBuf.Builder
         * @expose
         */
        ProtoBuf.Builder = (function(ProtoBuf, Lang, Reflect) {
            "use strict";
            
            /**
             * Constructs a new Builder.
             * @exports ProtoBuf.Builder
             * @class Provides the functionality to build protocol messages.
             * @constructor
             */
            var Builder = function() {
        
                /**
                 * Namespace.
                 * @type {Object.<string,ProtoBuf.Reflect.Message>}
                 * @dict
                 * @expose
                 */
                this.ns = new Reflect.Namespace(null, ""); // Global namespace
        
                /**
                 * Namespace pointer.
                 * @type {Object.<string, *>}
                 * @dict
                 * @expose
                 */
                this.ptr = this.ns;
        
                /**
                 * Resolved flag.
                 * @type {boolean}
                 * @expose
                 */
                this.resolved = false;
        
                /**
                 * The current building result.
                 * @type {*|null}
                 * @expose
                 */
                this.result = null;
            };
        
            /**
             * Resets the pointer to the global namespace.
             * @expose
             */
            Builder.prototype.reset = function() {
                this.ptr = this.ns;
            };
        
            /**
             * Defines a package on top of the current pointer position and places the pointer on it.
             * @throws {Error} If the package name is invalid
             * @expose
             */
            Builder.prototype.define = function(pkg) {
                if (typeof pkg != 'string' || !Lang.TYPEDEF.test(pkg)) {
                    throw(new Error("Illegal package name: "+pkg));
                }
                var part = pkg.split("."), i;
                for (i=0; i<part.length; i++) { // To be absolutely sure
                    if (!Lang.NAME.test(part[i])) {
                        throw(new Error("Illegal package name: "+part[i]));
                    }
                }
                for (i=0; i<part.length; i++) {
                    if (!this.ptr.hasChild(part[i])) { // Keep existing namespace
                        this.ptr.addChild(new Reflect.Namespace(this.ptr, part[i]));
                    }
                    this.ptr = this.ptr.getChild(part[i]);
                }
            };
        
            /**
             * Tests if a definition is a valid message definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidMessage = function(def) {
                // Messages require a string name
                if (typeof def["name"] != 'string' || !Lang.NAME.test(def["name"])) {
                    return false;
                }
                // Messages must not contain values (that'd be an enum)
                if (typeof def["values"] != 'undefined') {
                    return false;
                }
                // Fields, enums and messages are arrays if provided
                var i;
                if (typeof def["fields"] != 'undefined') {
                    if (!(def["fields"] instanceof Array)) {
                        return false;
                    }
                    var ids = [], id; // IDs must be unique
                    for (i=0; i<def["fields"].length; i++) {
                        if (!Builder.isValidMessageField(def["fields"][i])) {
                            return false;
                        }
                        id = parseInt(def["id"], 10);
                        if (ids.indexOf(id) >= 0) {
                            return false;
                        }
                        ids.push(id);
                    }
                    ids = null;
                }
                if (typeof def["enums"] != 'undefined') {
                    if (!(def["enums"] instanceof Array)) {
                        return false;
                    }
                    for (i=0; i<def["enums"].length; i++) {
                        if (!Builder.isValidEnum(def["enums"][i])) {
                            return false;
                        }
                    }
                }
                if (typeof def["messages"] != 'undefined') {
                    if (!(def["messages"] instanceof Array)) {
                        return false;
                    }
                    for (i=0; i<def["messages"].length; i++) {
                        if (!Builder.isValidMessage(def["messages"][i])) {
                            return false;
                        }
                    }
                }
                return true;
            };
        
            /**
             * Tests if a definition is a valid message field definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidMessageField = function(def) {
                // Message fields require a string rule, name and type and an id
                if (typeof def["rule"] != 'string' || typeof def["name"] != 'string' || typeof def["type"] != 'string' || typeof def["id"] == 'undefined') {
                    return false;
                }
                if (!Lang.RULE.test(def["rule"]) || !Lang.NAME.test(def["name"]) || !Lang.TYPEREF.test(def["type"]) || !Lang.ID.test(""+def["id"])) {
                    return false;
                }
                if (typeof def["options"] != 'undefined') {
                    // Options are objects
                    if (typeof def["options"] != 'object') {
                        return false;
                    }
                    // Options are <string,number|typeref>
                    var keys = Object.keys(def["options"]);
                    for (var i=0; i<keys.length; i++) {
                        if (!Lang.NAME.test(keys[i]) || (!Lang.ID.test(""+def["options"][keys[i]]) && !Lang.TYPEREF.test(def["options"][keys[i]]))) {
                            return false;
                        }
                    }
                }
                return true;
            };
        
            /**
             * Tests if a definition is a valid enum definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidEnum = function(def) {
                // Enums requrie a string name
                if (typeof def["name"] != 'string' || !Lang.NAME.test(def["name"])) {
                    return false;
                }
                // Enums require at least one value
                if (typeof def["values"] == 'undefined' || !(def["values"] instanceof Array) || def["values"].length == 0) {
                    return false;
                }
                for (var i=0; i<def["values"].length; i++) {
                    // Values are objects
                    if (typeof def["values"][i] != "object") {
                        return false;
                    }
                    // Values require a string name and an id
                    if (typeof def["values"][i]["name"] != 'string' || typeof def["values"][i]["id"] == 'undefined') {
                        return false;
                    }
                    if (!Lang.NAME.test(def["values"][i]["name"]) || !Lang.ID.test(""+def["values"][i]["id"])) {
                        return false;
                    }
                }
                // It's not important if there are other fields because ["values"] is already unique
                return true;
            };
        
            /**
             * Creates ths specified protocol types at the current pointer position.
             * @throws {Error} If a message definition is invalid
             * @expose
             */
            Builder.prototype.create = function(messages) {
                if (!messages) return; // Nothing to create
                if (!(messages instanceof Array)) {
                    messages = [messages];
                }
                if (messages.length == 0) return;
        
                // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
                var stack = [], defs, def, obj, subObj, i, j;
                stack.push(messages); // One level [a, b, c]
                while (stack.length > 0) {
                    defs = stack.pop();
                    if (defs instanceof Array) { // Stack always contains entire namespaces
                        while (defs.length > 0) {
                            def = defs.shift(); // Namespace always contains an array of messages and enums
                            if (Builder.isValidMessage(def)) {
                                obj = new Reflect.Message(this.ptr, def["name"]);
                                // Create fields
                                if (def["fields"] && def["fields"].length > 0) {
                                    for (i=0; i<def["fields"].length; i++) { // i=Fields
                                        if (!Builder.isValidMessageField(def["fields"][i])) {
                                            throw(new Error("Not a valid message field definition in message "+obj.name+": "+JSON.stringify(def["fields"][i])));
                                        }
                                        if (def["fields"][i]["options"]) {
                                            subObj = Object.keys(def["fields"][i]["options"]);
                                            for (j=0; j<subObj.length; j++) { // j=Option names
                                                if (!Lang.NAME.test(subObj[j])) {
                                                    throw(new Error("Illegal field option name in message "+obj.name+"#"+def["fields"][i]["name"]+": "+subObj[j]));
                                                }
                                                if (!Lang.ID.test(""+def["fields"][i]["options"][subObj[j]]) && !Lang.TYPEREF.test(def["fields"][i]["options"][subObj[j]])) {
                                                    throw(new Error("Illegal field option value in message "+obj.name+"#"+def["fields"][i]["name"]+"#"+subObj[j]+": "+def["fields"][i]["options"][subObj[j]]));
                                                }
                                            }
                                            subObj = null;
                                        }
                                        obj.addChild(new Reflect.Message.Field(obj, def["fields"][i]["rule"], def["fields"][i]["type"], def["fields"][i]["name"], def["fields"][i]["id"], def["fields"][i]["options"]));
                                    }
                                }
                                // Push enums and messages to stack
                                subObj = [];
                                if (typeof def["enums"] != 'undefined' && def['enums'].length > 0) {
                                    for (i=0; i<def["enums"].length; i++) {
                                        subObj.push(def["enums"][i]);
                                    }
                                }
                                if (def["messages"] && def["messages"].length > 0) {
                                    for (i=0; i<def["messages"].length; i++) {
                                        subObj.push(def["messages"][i]);
                                    }
                                }
                                this.ptr.addChild(obj); // Add to current namespace
                                if (subObj.length > 0) {
                                    stack.push(defs); // Push the current level back
                                    defs = subObj; // Continue processing sub level
                                    subObj = null;
                                    this.ptr = obj; // And move the pointer to this namespace
                                    obj = null;
                                    continue;
                                }
                                subObj = null;
                                obj = null;
                            } else if (Builder.isValidEnum(def)) {
                                obj = new Reflect.Enum(this.ptr, def["name"]);
                                for (i=0; i<def["values"].length; i++) {
                                    obj.addChild(new Reflect.Enum.Value(obj, def["values"][i]["name"], def["values"][i]["id"]));
                                }
                                this.ptr.addChild(obj);
                                obj = null;
                            } else {
                                throw(new Error("Not a valid message or enum definition: "+JSON.stringify(def)));
                            }
                            def = null;
                        }
                        // Break goes here
                    } else {
                        throw(new Error("Not a valid namespace definition: "+JSON.stringify(defs)));
                    }
                    defs = null;
                    this.ptr = this.ptr.parent; // This namespace is s done
                }
                this.resolved = false; // Require re-resolve
                this.result = null; // Require re-build
            };
        
            /**
             * Resolves the namespace.
             * @throws {Error} If a type cannot be resolved
             * @expose
             */
            Builder.prototype.resolveAll = function() {
                // Resolve all reflected objects
                if (this.ptr == null || typeof this.ptr.type == 'object') return; // Done (already resolved)
                if (this.ptr instanceof Reflect.Namespace) {
                    // Build all children
                    var children = this.ptr.getChildren();
                    for (var i=0; i<children.length; i++) {
                        this.ptr = children[i];
                        this.resolveAll();
                    }
                } else if (this.ptr instanceof Reflect.Message.Field) {
                    if (!Lang.TYPE.test(this.ptr.type)) { // Resolve type...
                        if (!Lang.TYPEREF.test(this.ptr.type)) {
                            throw(new Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                        }
                        var res = this.ptr.parent.resolve(this.ptr.type);
                        if (!res) {
                            throw(new Error("Unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                        }
                        this.ptr.resolvedType = res;
                        if (res instanceof Reflect.Enum) {
                            this.ptr.type = ProtoBuf.TYPES["enum"];
                        } else if (res instanceof Reflect.Message) {
                            this.ptr.type = ProtoBuf.TYPES["message"];
                        } else {
                            throw(new Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                        }
                    } else {
                        this.ptr.type = ProtoBuf.TYPES[this.ptr.type];
                    }
                } else if (this.ptr instanceof ProtoBuf.Reflect.Enum.Value) {
                    // No need to build enum values (built in enum)
                } else {
                    throw(new Error("Illegal object type in namespace: "+typeof(this.ptr)+":"+this.ptr));
                }
                this.reset();
            };
        
            /**
             * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
             * return the builded package.
             * @param {string=} path Specified what to return. If omitted, the entire namespace will be returned.
             * @return {ProtoBuf.Builder} this
             * @throws {string} Exception if a type could not be resolved
             * @expose
             */
            Builder.prototype.build = function(path) {
                this.reset();
                if (!this.resolved) {
                    this.resolveAll();
                    this.resolved = true;
                    this.result = null; // Require re-build
                }
                if (this.result == null) { // (Re-)Build
                    this.result = this.ns.build();
                }
                if (!path) {
                    return this.result;
                } else {
                    var part = path.split(".");
                    var ptr = this.result; // Build namespace pointer (no hasChild etc.)
                    for (var i=0; i<part.length; i++) {
                        if (ptr[part[i]]) {
                            ptr = ptr[part[i]];
                        } else {
                            ptr = null;
                            break;
                        }
                    }
                    return ptr;
                }
            };
        
            /**
             * Returns a string representation of this object.
             * @returns {string} String representation as of "Builder"
             * @expose
             */
            Builder.prototype.toString = function() {
                return "Builder";
            };
            
            return Builder;
            
        })(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
                
        /**
         * Builds a .proto definition and returns the Builder.
         * @param {string} proto .proto file contents
         * @return {ProtoBuf.Builder} Builder to create new messages
         * @throws {Error} If the definition cannot be parsed or built
         * @expose
         */
        ProtoBuf.protoFromString = function(proto) {
            throw(new Error("This build of ProtoBuf.js does not include DotProto support. See: https://github.com/dcodeIO/ProtoBuf.js"));
        };

        /**
         * Builds a .proto file and returns the Builder.
         * <p>Node.js: If no callback is specified, this will read the file synchronously using the "fs" module and
         * return the Builder. If a callback is specified, this will read the file asynchronously and call the callback
         * with the Builder as its first argument afterwards.</p>
         * <p>Browser: Will read the file asynchronously and call the callback with the Builder as its first argument
         * afterwards.</p>
         * @param {string} filename Path to proto filename
         * @param {function(ProtoBuf.Builder)=} callback Callback that will receive the Builder as its first argument
         * @return {ProtoBuf.Builder|undefined} The Builder if synchronous (no callback), else undefined
         * @throws {Error} If the file cannot be read or cannot be parsed
         * @expose
         */
        ProtoBuf.protoFromFile = function(filename, callback) {
            throw(new Error("This build of ProtoBuf.js does not include DotProto support. See: https://github.com/dcodeIO/ProtoBuf.js"));
        };

        /**
         * Constructs a new Builder with the specified package defined.
         * @param {string=} pkg Package name as fully qualified name, e.g. "My.Game". If no package is specified, the
         * builder will only contain a global namespace.
         * @return {ProtoBuf.Builder} New Builder
         * @expose
         */
        ProtoBuf.newBuilder = function(pkg) {
            var builder = new ProtoBuf.Builder();
            if (typeof pkg != 'undefined') {
                builder.define(pkg);
            }
            return builder;
        };

        return ProtoBuf;
    }

    // Enable module loading if available
    if (typeof module != 'undefined' && module["exports"]) { // CommonJS
        module["exports"] = loadProtoBuf(require("bytebuffer"));
    } else if (typeof define != 'undefined' && define["amd"]) { // AMD
        define("ProtoBuf", ["ByteBuffer"], loadProtoBuf);
    } else { // Shim
        if (!global["dcodeIO"]) {
            global["dcodeIO"] = {};
        }
        global["dcodeIO"]["ProtoBuf"] = loadProtoBuf(global["dcodeIO"]["ByteBuffer"]);
    }

})(this);