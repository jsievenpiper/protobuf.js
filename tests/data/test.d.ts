// $> pbts --out tests/data/test.d.ts --no-comments tests/data/test.js
// Generated Sat, 31 Dec 2016 03:08:36 UTC

import * as $protobuf from "../..";

export namespace jspb {

    namespace test {

        class Empty {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.Empty;
            static encode(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Empty|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Empty;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Empty;
            static verify(message: (jspb.test.Empty|Object)): string;
        }

        class EnumContainer {
            constructor(properties?: Object);
            outerEnum: number;
            static create(properties?: Object): jspb.test.EnumContainer;
            static encode(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.EnumContainer|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.EnumContainer;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.EnumContainer;
            static verify(message: (jspb.test.EnumContainer|Object)): string;
        }

        class Simple1 {
            constructor(properties?: Object);
            aString: string;
            aRepeatedString: string[];
            aBoolean: boolean;
            static create(properties?: Object): jspb.test.Simple1;
            static encode(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Simple1|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple1;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Simple1;
            static verify(message: (jspb.test.Simple1|Object)): string;
        }

        class Simple2 {
            constructor(properties?: Object);
            aString: string;
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.Simple2;
            static encode(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Simple2|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Simple2;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Simple2;
            static verify(message: (jspb.test.Simple2|Object)): string;
        }

        class SpecialCases {
            constructor(properties?: Object);
            normal: string;
            default: string;
            function: string;
            var: string;
            static create(properties?: Object): jspb.test.SpecialCases;
            static encode(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.SpecialCases|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.SpecialCases;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.SpecialCases;
            static verify(message: (jspb.test.SpecialCases|Object)): string;
        }

        class OptionalFields {
            constructor(properties?: Object);
            aString: string;
            aBool: boolean;
            aNestedMessage: jspb.test.OptionalFields.Nested;
            aRepeatedMessage: jspb.test.OptionalFields.Nested[];
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.OptionalFields;
            static encode(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.OptionalFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields;
            static verify(message: (jspb.test.OptionalFields|Object)): string;
        }

        namespace OptionalFields {

            class Nested {
                constructor(properties?: Object);
                anInt: number;
                static create(properties?: Object): jspb.test.OptionalFields.Nested;
                static encode(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.OptionalFields.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.OptionalFields.Nested;
                static verify(message: (jspb.test.OptionalFields.Nested|Object)): string;
            }
        }

        class HasExtensions {
            constructor(properties?: Object);
            str1: string;
            str2: string;
            str3: string;
            static create(properties?: Object): jspb.test.HasExtensions;
            static encode(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.HasExtensions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.HasExtensions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.HasExtensions;
            static verify(message: (jspb.test.HasExtensions|Object)): string;
        }

        class Complex {
            constructor(properties?: Object);
            aString: string;
            anOutOfOrderBool: boolean;
            aNestedMessage: jspb.test.Complex.Nested;
            aRepeatedMessage: jspb.test.Complex.Nested[];
            aRepeatedString: string[];
            static create(properties?: Object): jspb.test.Complex;
            static encode(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Complex;
            static verify(message: (jspb.test.Complex|Object)): string;
        }

        namespace Complex {

            class Nested {
                constructor(properties?: Object);
                anInt: number;
                static create(properties?: Object): jspb.test.Complex.Nested;
                static encode(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.Complex.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Complex.Nested;
                static verify(message: (jspb.test.Complex.Nested|Object)): string;
            }
        }

        class OuterMessage {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.OuterMessage;
            static encode(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.OuterMessage|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage;
            static verify(message: (jspb.test.OuterMessage|Object)): string;
        }

        namespace OuterMessage {

            class Complex {
                constructor(properties?: Object);
                innerComplexField: number;
                static create(properties?: Object): jspb.test.OuterMessage.Complex;
                static encode(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.OuterMessage.Complex|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.OuterMessage.Complex;
                static verify(message: (jspb.test.OuterMessage.Complex|Object)): string;
            }
        }

        class IsExtension {
            constructor(properties?: Object);
            ext1: string;
            static create(properties?: Object): jspb.test.IsExtension;
            static encode(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.IsExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IsExtension;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.IsExtension;
            static verify(message: (jspb.test.IsExtension|Object)): string;
        }

        class IndirectExtension {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.IndirectExtension;
            static encode(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.IndirectExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.IndirectExtension;
            static verify(message: (jspb.test.IndirectExtension|Object)): string;
        }

        class DefaultValues {
            constructor(properties?: Object);
            stringField: string;
            boolField: boolean;
            intField: (number|Long);
            enumField: number;
            emptyField: string;
            bytesField: Uint8Array;
            static create(properties?: Object): jspb.test.DefaultValues;
            static encode(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.DefaultValues|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.DefaultValues;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.DefaultValues;
            static verify(message: (jspb.test.DefaultValues|Object)): string;
        }

        class FloatingPointFields {
            constructor(properties?: Object);
            optionalFloatField: number;
            requiredFloatField: number;
            repeatedFloatField: number[];
            defaultFloatField: number;
            optionalDoubleField: number;
            requiredDoubleField: number;
            repeatedDoubleField: number[];
            defaultDoubleField: number;
            static create(properties?: Object): jspb.test.FloatingPointFields;
            static encode(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.FloatingPointFields|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.FloatingPointFields;
            static verify(message: (jspb.test.FloatingPointFields|Object)): string;
        }

        class TestClone {
            constructor(properties?: Object);
            str: string;
            simple1: jspb.test.Simple1;
            simple2: jspb.test.Simple1[];
            bytesField: Uint8Array;
            unused: string;
            static create(properties?: Object): jspb.test.TestClone;
            static encode(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestClone|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestClone;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestClone;
            static verify(message: (jspb.test.TestClone|Object)): string;
        }

        class CloneExtension {
            constructor(properties?: Object);
            ext: string;
            static create(properties?: Object): jspb.test.CloneExtension;
            static encode(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.CloneExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.CloneExtension;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.CloneExtension;
            static verify(message: (jspb.test.CloneExtension|Object)): string;
        }

        class TestGroup {
            constructor(properties?: Object);
            id: string;
            requiredSimple: jspb.test.Simple2;
            optionalSimple: jspb.test.Simple2;
            static create(properties?: Object): jspb.test.TestGroup;
            static encode(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestGroup|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestGroup;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestGroup;
            static verify(message: (jspb.test.TestGroup|Object)): string;
        }

        class TestReservedNames {
            constructor(properties?: Object);
            extension: number;
            static create(properties?: Object): jspb.test.TestReservedNames;
            static encode(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestReservedNames|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNames;
            static verify(message: (jspb.test.TestReservedNames|Object)): string;
        }

        class TestReservedNamesExtension {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.TestReservedNamesExtension;
            static encode(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestReservedNamesExtension|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;
            static verify(message: (jspb.test.TestReservedNamesExtension|Object)): string;
        }

        class TestMessageWithOneof {
            constructor(properties?: Object);
            pone: string;
            pthree: string;
            rone: jspb.test.TestMessageWithOneof;
            rtwo: string;
            normalField: boolean;
            repeatedField: string[];
            aone: number;
            atwo: number;
            bone: number;
            btwo: number;
            partialOneof: (string|undefined);
            recursiveOneof: (string|undefined);
            defaultOneofA: (string|undefined);
            defaultOneofB: (string|undefined);
            static create(properties?: Object): jspb.test.TestMessageWithOneof;
            static encode(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestMessageWithOneof|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestMessageWithOneof;
            static verify(message: (jspb.test.TestMessageWithOneof|Object)): string;
        }

        class TestEndsWithBytes {
            constructor(properties?: Object);
            value: number;
            data: Uint8Array;
            static create(properties?: Object): jspb.test.TestEndsWithBytes;
            static encode(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestEndsWithBytes|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestEndsWithBytes;
            static verify(message: (jspb.test.TestEndsWithBytes|Object)): string;
        }

        class TestMapFieldsNoBinary {
            constructor(properties?: Object);
            mapStringString: string;
            mapStringInt32: number;
            mapStringInt64: (number|Long);
            mapStringBool: boolean;
            mapStringDouble: number;
            mapStringEnum: number;
            mapStringMsg: jspb.test.MapValueMessageNoBinary;
            mapInt32String: string;
            mapInt64String: string;
            mapBoolString: string;
            testMapFields: jspb.test.TestMapFieldsNoBinary;
            mapStringTestmapfields: jspb.test.TestMapFieldsNoBinary;
            static create(properties?: Object): jspb.test.TestMapFieldsNoBinary;
            static encode(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;
            static verify(message: (jspb.test.TestMapFieldsNoBinary|Object)): string;
        }

        class MapValueMessageNoBinary {
            constructor(properties?: Object);
            foo: number;
            static create(properties?: Object): jspb.test.MapValueMessageNoBinary;
            static encode(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;
            static verify(message: (jspb.test.MapValueMessageNoBinary|Object)): string;
        }

        class Deeply {
            constructor(properties?: Object);
            static create(properties?: Object): jspb.test.Deeply;
            static encode(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (jspb.test.Deeply|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply;
            static verify(message: (jspb.test.Deeply|Object)): string;
        }

        namespace Deeply {

            class Nested {
                constructor(properties?: Object);
                static create(properties?: Object): jspb.test.Deeply.Nested;
                static encode(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (jspb.test.Deeply.Nested|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested;
                static verify(message: (jspb.test.Deeply.Nested|Object)): string;
            }

            namespace Nested {

                class Message {
                    constructor(properties?: Object);
                    count: number;
                    static create(properties?: Object): jspb.test.Deeply.Nested.Message;
                    static encode(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    static encodeDelimited(message: (jspb.test.Deeply.Nested.Message|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                    static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;
                    static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;
                    static verify(message: (jspb.test.Deeply.Nested.Message|Object)): string;
                }
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        class FileDescriptorSet {
            constructor(properties?: Object);
            file: google.protobuf.FileDescriptorProto[];
            static create(properties?: Object): google.protobuf.FileDescriptorSet;
            static encode(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileDescriptorSet|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;
            static verify(message: (google.protobuf.FileDescriptorSet|Object)): string;
        }

        class FileDescriptorProto {
            constructor(properties?: Object);
            name: string;
            package: string;
            dependency: string[];
            publicDependency: number[];
            weakDependency: number[];
            messageType: google.protobuf.DescriptorProto[];
            enumType: google.protobuf.EnumDescriptorProto[];
            service: google.protobuf.ServiceDescriptorProto[];
            extension: google.protobuf.FieldDescriptorProto[];
            options: google.protobuf.FileOptions;
            sourceCodeInfo: google.protobuf.SourceCodeInfo;
            syntax: string;
            static create(properties?: Object): google.protobuf.FileDescriptorProto;
            static encode(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;
            static verify(message: (google.protobuf.FileDescriptorProto|Object)): string;
        }

        class DescriptorProto {
            constructor(properties?: Object);
            name: string;
            field: google.protobuf.FieldDescriptorProto[];
            extension: google.protobuf.FieldDescriptorProto[];
            nestedType: google.protobuf.DescriptorProto[];
            enumType: google.protobuf.EnumDescriptorProto[];
            extensionRange: google.protobuf.DescriptorProto.ExtensionRange[];
            oneofDecl: google.protobuf.OneofDescriptorProto[];
            options: google.protobuf.MessageOptions;
            reservedRange: google.protobuf.DescriptorProto.ReservedRange[];
            reservedName: string[];
            static create(properties?: Object): google.protobuf.DescriptorProto;
            static encode(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.DescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;
            static verify(message: (google.protobuf.DescriptorProto|Object)): string;
        }

        namespace DescriptorProto {

            class ExtensionRange {
                constructor(properties?: Object);
                start: number;
                end: number;
                static create(properties?: Object): google.protobuf.DescriptorProto.ExtensionRange;
                static encode(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;
                static verify(message: (google.protobuf.DescriptorProto.ExtensionRange|Object)): string;
            }

            class ReservedRange {
                constructor(properties?: Object);
                start: number;
                end: number;
                static create(properties?: Object): google.protobuf.DescriptorProto.ReservedRange;
                static encode(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;
                static verify(message: (google.protobuf.DescriptorProto.ReservedRange|Object)): string;
            }
        }

        class FieldDescriptorProto {
            constructor(properties?: Object);
            name: string;
            number: number;
            label: number;
            type: number;
            typeName: string;
            extendee: string;
            defaultValue: string;
            oneofIndex: number;
            jsonName: string;
            options: google.protobuf.FieldOptions;
            static create(properties?: Object): google.protobuf.FieldDescriptorProto;
            static encode(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FieldDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;
            static verify(message: (google.protobuf.FieldDescriptorProto|Object)): string;
        }

        class OneofDescriptorProto {
            constructor(properties?: Object);
            name: string;
            options: google.protobuf.OneofOptions;
            static create(properties?: Object): google.protobuf.OneofDescriptorProto;
            static encode(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.OneofDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;
            static verify(message: (google.protobuf.OneofDescriptorProto|Object)): string;
        }

        class EnumDescriptorProto {
            constructor(properties?: Object);
            name: string;
            value: google.protobuf.EnumValueDescriptorProto[];
            options: google.protobuf.EnumOptions;
            static create(properties?: Object): google.protobuf.EnumDescriptorProto;
            static encode(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;
            static verify(message: (google.protobuf.EnumDescriptorProto|Object)): string;
        }

        class EnumValueDescriptorProto {
            constructor(properties?: Object);
            name: string;
            number: number;
            options: google.protobuf.EnumValueOptions;
            static create(properties?: Object): google.protobuf.EnumValueDescriptorProto;
            static encode(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;
            static verify(message: (google.protobuf.EnumValueDescriptorProto|Object)): string;
        }

        class ServiceDescriptorProto {
            constructor(properties?: Object);
            name: string;
            method: google.protobuf.MethodDescriptorProto[];
            options: google.protobuf.ServiceOptions;
            static create(properties?: Object): google.protobuf.ServiceDescriptorProto;
            static encode(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;
            static verify(message: (google.protobuf.ServiceDescriptorProto|Object)): string;
        }

        class MethodDescriptorProto {
            constructor(properties?: Object);
            name: string;
            inputType: string;
            outputType: string;
            options: google.protobuf.MethodOptions;
            clientStreaming: boolean;
            serverStreaming: boolean;
            static create(properties?: Object): google.protobuf.MethodDescriptorProto;
            static encode(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MethodDescriptorProto|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;
            static verify(message: (google.protobuf.MethodDescriptorProto|Object)): string;
        }

        class FileOptions {
            constructor(properties?: Object);
            javaPackage: string;
            javaOuterClassname: string;
            javaMultipleFiles: boolean;
            javaGenerateEqualsAndHash: boolean;
            javaStringCheckUtf8: boolean;
            optimizeFor: number;
            goPackage: string;
            ccGenericServices: boolean;
            javaGenericServices: boolean;
            pyGenericServices: boolean;
            deprecated: boolean;
            ccEnableArenas: boolean;
            objcClassPrefix: string;
            csharpNamespace: string;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.FileOptions;
            static encode(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FileOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;
            static verify(message: (google.protobuf.FileOptions|Object)): string;
        }

        class MessageOptions {
            constructor(properties?: Object);
            messageSetWireFormat: boolean;
            noStandardDescriptorAccessor: boolean;
            deprecated: boolean;
            mapEntry: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.MessageOptions;
            static encode(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MessageOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;
            static verify(message: (google.protobuf.MessageOptions|Object)): string;
        }

        class FieldOptions {
            constructor(properties?: Object);
            ctype: number;
            packed: boolean;
            jstype: number;
            lazy: boolean;
            deprecated: boolean;
            weak: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.FieldOptions;
            static encode(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.FieldOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;
            static verify(message: (google.protobuf.FieldOptions|Object)): string;
        }

        class OneofOptions {
            constructor(properties?: Object);
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.OneofOptions;
            static encode(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.OneofOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;
            static verify(message: (google.protobuf.OneofOptions|Object)): string;
        }

        class EnumOptions {
            constructor(properties?: Object);
            allowAlias: boolean;
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.EnumOptions;
            static encode(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;
            static verify(message: (google.protobuf.EnumOptions|Object)): string;
        }

        class EnumValueOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.EnumValueOptions;
            static encode(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.EnumValueOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;
            static verify(message: (google.protobuf.EnumValueOptions|Object)): string;
        }

        class ServiceOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.ServiceOptions;
            static encode(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.ServiceOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;
            static verify(message: (google.protobuf.ServiceOptions|Object)): string;
        }

        class MethodOptions {
            constructor(properties?: Object);
            deprecated: boolean;
            idempotencyLevel: number;
            uninterpretedOption: google.protobuf.UninterpretedOption[];
            static create(properties?: Object): google.protobuf.MethodOptions;
            static encode(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.MethodOptions|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;
            static verify(message: (google.protobuf.MethodOptions|Object)): string;
        }

        class UninterpretedOption {
            constructor(properties?: Object);
            name: google.protobuf.UninterpretedOption.NamePart[];
            identifierValue: string;
            positiveIntValue: (number|Long);
            negativeIntValue: (number|Long);
            doubleValue: number;
            stringValue: Uint8Array;
            aggregateValue: string;
            static create(properties?: Object): google.protobuf.UninterpretedOption;
            static encode(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.UninterpretedOption|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;
            static verify(message: (google.protobuf.UninterpretedOption|Object)): string;
        }

        namespace UninterpretedOption {

            class NamePart {
                constructor(properties?: Object);
                namePart: string;
                isExtension: boolean;
                static create(properties?: Object): google.protobuf.UninterpretedOption.NamePart;
                static encode(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;
                static verify(message: (google.protobuf.UninterpretedOption.NamePart|Object)): string;
            }
        }

        class SourceCodeInfo {
            constructor(properties?: Object);
            location: google.protobuf.SourceCodeInfo.Location[];
            static create(properties?: Object): google.protobuf.SourceCodeInfo;
            static encode(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.SourceCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;
            static verify(message: (google.protobuf.SourceCodeInfo|Object)): string;
        }

        namespace SourceCodeInfo {

            class Location {
                constructor(properties?: Object);
                path: number[];
                span: number[];
                leadingComments: string;
                trailingComments: string;
                leadingDetachedComments: string[];
                static create(properties?: Object): google.protobuf.SourceCodeInfo.Location;
                static encode(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;
                static verify(message: (google.protobuf.SourceCodeInfo.Location|Object)): string;
            }
        }

        class GeneratedCodeInfo {
            constructor(properties?: Object);
            annotation: google.protobuf.GeneratedCodeInfo.Annotation[];
            static create(properties?: Object): google.protobuf.GeneratedCodeInfo;
            static encode(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: $protobuf.Writer): $protobuf.Writer;
            static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;
            static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;
            static verify(message: (google.protobuf.GeneratedCodeInfo|Object)): string;
        }

        namespace GeneratedCodeInfo {

            class Annotation {
                constructor(properties?: Object);
                path: number[];
                sourceFile: string;
                begin: number;
                end: number;
                static create(properties?: Object): google.protobuf.GeneratedCodeInfo.Annotation;
                static encode(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: $protobuf.Writer): $protobuf.Writer;
                static decode(readerOrBuffer: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;
                static decodeDelimited(readerOrBuffer: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;
                static verify(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object)): string;
            }
        }
    }
}
