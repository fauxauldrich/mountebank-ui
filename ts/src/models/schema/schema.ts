export const ImposterSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/Imposter",
  definitions: {
    Imposter: {
      type: "object",
      properties: {
        port: {
          type: "number",
        },
        protocol: {
          type: "string",
          enum: ["http", "https", "tcp", "smtp"],
        },
        name: {
          type: "string",
        },
        recordRequests: {
          type: "string",
          enum: ["true", "false"],
        },
        key: {
          type: "string",
        },
        cert: {
          type: "string",
        },
        mutualAuth: {
          type: "boolean",
        },
        defaultResponse: {
          $ref: "#/definitions/DefaultResponse",
        },
        stubs: {
          type: "array",
          items: {
            $ref: "#/definitions/Stub",
          },
        },
        endOfRequestResolver: {
          $ref: "#/definitions/EndOfRequestResolver",
        },
      },
      required: ["port", "protocol"],
      additionalProperties: false,
    },
    DefaultResponse: {
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        body: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "object",
            },
          ],
        },
        headers: {
          type: "object",
        },
      },
      required: ["statusCode"],
      additionalProperties: false,
    },
    Stub: {
      type: "object",
      properties: {
        responses: {
          type: "array",
          items: {
            anyOf: [
              {
                $ref: "#/definitions/IsResponse",
              },
              {
                $ref: "#/definitions/ProxyResponse",
              },
              {
                $ref: "#/definitions/InjectResponse",
              },
            ],
          },
        },
        predicates: {
          type: "array",
          items: {
            anyOf: [
              {
                $ref: "#/definitions/Equals",
              },
              {
                $ref: "#/definitions/DeepEquals",
              },
              {
                $ref: "#/definitions/Contains",
              },
              {
                $ref: "#/definitions/StartsWith",
              },
              {
                $ref: "#/definitions/EndsWith",
              },
              {
                $ref: "#/definitions/Matches",
              },
              {
                $ref: "#/definitions/Exists",
              },
              {
                $ref: "#/definitions/Or",
              },
              {
                $ref: "#/definitions/Not",
              },
              {
                $ref: "#/definitions/And",
              },
              {
                $ref: "#/definitions/Inject",
              },
            ],
          },
        },
      },
      required: ["responses"],
      additionalProperties: false,
    },
    IsResponse: {
      type: "object",
      properties: {
        is: {
          type: "object",
          properties: {
            statusCode: {
              type: "number",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
              ],
            },
            _mode: {
              type: "string",
            },
          },
          additionalProperties: false,
        },
        repeat: {
          type: "number",
        },
        behaviors: {
          type: "array",
          items: {
            anyOf: [
              {
                $ref: "#/definitions/WaitBehavior",
              },
              {
                $ref: "#/definitions/DecorateBehavior",
              },
              {
                $ref: "#/definitions/ShellTransformBehavior",
              },
              {
                $ref: "#/definitions/CopyBehavior",
              },
              {
                $ref: "#/definitions/LookUpBehavior",
              },
            ],
          },
        },
      },
      required: ["is"],
      additionalProperties: false,
    },
    WaitBehavior: {
      type: "object",
      properties: {
        wait: {
          type: "number",
        },
      },
      required: ["wait"],
      additionalProperties: false,
    },
    DecorateBehavior: {
      type: "object",
      properties: {
        decorate: {
          type: "string",
        },
      },
      required: ["decorate"],
      additionalProperties: false,
    },
    ShellTransformBehavior: {
      type: "object",
      properties: {
        shellTransform: {
          type: "string",
        },
      },
      required: ["shellTransform"],
      additionalProperties: false,
    },
    CopyBehavior: {
      type: "object",
      properties: {
        from: {
          type: "string",
        },
        into: {
          type: "string",
        },
        using: {
          type: "object",
          properties: {
            method: {
              type: "string",
              enum: ["xpath", "jsonpath", "regex"],
            },
            selector: {
              type: "string",
            },
            ns: {
              type: "object",
            },
            options: {
              type: "object",
              properties: {
                ignoreCase: {
                  type: "boolean",
                },
                multiline: {
                  type: "boolean",
                },
              },
              required: ["ignoreCase", "multiline"],
              additionalProperties: false,
            },
          },
          required: ["method", "selector"],
          additionalProperties: false,
        },
      },
      required: ["from", "into", "using"],
      additionalProperties: false,
    },
    LookUpBehavior: {
      type: "object",
      properties: {
        key: {
          type: "object",
          properties: {
            from: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
              ],
            },
            using: {
              type: "object",
              properties: {
                method: {
                  type: "string",
                  enum: ["xpath", "jsonpath", "regex"],
                },
                selector: {
                  type: "string",
                },
                ns: {
                  type: "object",
                },
                options: {
                  type: "object",
                  properties: {
                    ignoreCase: {
                      type: "boolean",
                    },
                    multiline: {
                      type: "boolean",
                    },
                  },
                  required: ["ignoreCase", "multiline"],
                  additionalProperties: false,
                },
              },
              required: ["method", "selector"],
              additionalProperties: false,
            },
            index: {
              type: "number",
            },
          },
          required: ["from", "using", "index"],
          additionalProperties: false,
        },
        fromDataSource: {
          type: "object",
          properties: {
            csv: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                },
                keyColumn: {
                  type: "string",
                },
                delimiter: {
                  type: "string",
                },
              },
              required: ["path", "keyColumn", "delimiter"],
              additionalProperties: false,
            },
          },
          required: ["csv"],
          additionalProperties: false,
        },
        into: {
          type: "string",
        },
      },
      required: ["key", "fromDataSource", "into"],
      additionalProperties: false,
    },
    ProxyResponse: {
      type: "object",
      additionalProperties: false,
    },
    InjectResponse: {
      type: "object",
      properties: {
        inject: {
          type: "string",
          format: "javascript",
          default:
            'function (config){\n\tvar random_number = parseInt(Math.random() * 1000000000);\n\treturn {\n\t\theader: {"content-type": "application/json"},\n\t\tbody: {"phone_number": random_number}\n\t};\n}',
          options: {
            ace: {
              theme: "ace/theme/monokai",
              tabSize: 2,
              useSoftTabs: true,
              wrap: true,
            },
          },
        },
      },
      required: ["inject"],
      additionalProperties: false,
    },
    Equals: {
      type: "object",
      properties: {
        equals: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["equals"],
      additionalProperties: false,
    },
    DeepEquals: {
      type: "object",
      properties: {
        deepEquals: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["deepEquals"],
      additionalProperties: false,
    },
    Contains: {
      type: "object",
      properties: {
        contains: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["contains"],
      additionalProperties: false,
    },
    StartsWith: {
      type: "object",
      properties: {
        startsWith: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["startsWith"],
      additionalProperties: false,
    },
    EndsWith: {
      type: "object",
      properties: {
        endsWith: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["endsWith"],
      additionalProperties: false,
    },
    Matches: {
      type: "object",
      properties: {
        matches: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["matches"],
      additionalProperties: false,
    },
    Exists: {
      type: "object",
      properties: {
        exists: {
          type: "object",
          properties: {
            method: {
              type: ["string", "boolean"],
            },
            path: {
              type: ["string", "boolean"],
            },
            query: {
              type: "object",
            },
            headers: {
              type: "object",
            },
            body: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "object",
                },
                {
                  type: "boolean",
                },
              ],
            },
            data: {
              type: ["string", "boolean"],
            },
          },
          additionalProperties: false,
        },
        caseSensitive: {
          type: "boolean",
        },
        except: {
          type: "string",
        },
        xpath: {
          type: "string",
        },
        jsonpath: {
          type: "string",
        },
      },
      required: ["exists"],
      additionalProperties: false,
    },
    Or: {
      type: "object",
      properties: {
        or: {
          type: "array",
          items: {
            anyOf: [
              {
                $ref: "#/definitions/Equals",
              },
              {
                $ref: "#/definitions/DeepEquals",
              },
              {
                $ref: "#/definitions/Contains",
              },
              {
                $ref: "#/definitions/StartsWith",
              },
              {
                $ref: "#/definitions/EndsWith",
              },
              {
                $ref: "#/definitions/Matches",
              },
              {
                $ref: "#/definitions/Exists",
              },
            ],
          },
        },
      },
      required: ["or"],
      additionalProperties: false,
    },
    Not: {
      type: "object",
      properties: {
        not: {
          anyOf: [
            {
              $ref: "#/definitions/Equals",
            },
            {
              $ref: "#/definitions/DeepEquals",
            },
            {
              $ref: "#/definitions/Contains",
            },
            {
              $ref: "#/definitions/StartsWith",
            },
            {
              $ref: "#/definitions/EndsWith",
            },
            {
              $ref: "#/definitions/Matches",
            },
            {
              $ref: "#/definitions/Exists",
            },
          ],
        },
      },
      required: ["not"],
      additionalProperties: false,
    },
    And: {
      type: "object",
      properties: {
        and: {
          type: "array",
          items: {
            anyOf: [
              {
                $ref: "#/definitions/Equals",
              },
              {
                $ref: "#/definitions/DeepEquals",
              },
              {
                $ref: "#/definitions/Contains",
              },
              {
                $ref: "#/definitions/StartsWith",
              },
              {
                $ref: "#/definitions/EndsWith",
              },
              {
                $ref: "#/definitions/Matches",
              },
              {
                $ref: "#/definitions/Exists",
              },
            ],
          },
        },
      },
      required: ["and"],
      additionalProperties: false,
    },
    Inject: {
      type: "object",
      properties: {
        inject: {
          type: "string",
          format: "javascript",
          options: {
            ace: {
              theme: "ace/theme/monokai",
              tabSize: 2,
              useSoftTabs: true,
              wrap: true,
            },
          },
        },
      },
      required: ["inject"],
      additionalProperties: false,
    },
    EndOfRequestResolver: {
      type: "object",
      properties: {
        inject: {
          type: "string",
          format: "javascript",
          options: {
            ace: {
              theme: "ace/theme/monokai",
              tabSize: 2,
              useSoftTabs: true,
              wrap: true,
            },
          },
        },
      },
      required: ["inject"],
      additionalProperties: false,
    },
  },
};
