export interface JsonTransformResult {
  value: string;
  error: string;
}

export function formatJson(input: string, spaces = 2): JsonTransformResult {
  try {
    const parsed = JSON.parse(input);
    return {
      value: JSON.stringify(parsed, null, spaces),
      error: ''
    };
  } catch (error) {
    return {
      value: '',
      error: error instanceof Error ? error.message : 'JSON 解析失败'
    };
  }
}

export function compactJson(input: string): JsonTransformResult {
  try {
    const parsed = JSON.parse(input);
    return {
      value: JSON.stringify(parsed),
      error: ''
    };
  } catch (error) {
    return {
      value: '',
      error: error instanceof Error ? error.message : 'JSON 解析失败'
    };
  }
}
