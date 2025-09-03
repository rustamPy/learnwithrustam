export const SHORT_CODE = {
    'python': (name, params) => `class Solution:
    def ${name}(self, ${params.join(', ')}):
        pass
`
};

export const BASE_CODE = {
    'python': ((params, tests, name) =>
        `
import sys
import io
import json
import traceback
from math import *

params = ${params}
tests = ${JSON.stringify(tests)}
# Initialize the Solution objects

user_solution = Solution()
correct_solution = _Solution()

# Generate outputs
all_print_outputs = []
error_outputs = []
expected_outputs = []
user_outputs = []

for test in tests:
    expected_output = correct_solution.${name}(*test)
    expected_outputs.append(expected_output)

for test_index in range(len(tests)):
    temp_stdout = io.StringIO()
    sys.stdout = temp_stdout

    try:
        # Ensure we have the right number of inputs
        if len(tests[test_index]) != len(params):
            raise ValueError("The number of params and test is not matching")

        # Call the function with the input parameters
        actual_output = user_solution.${name}(*tests[test_index][:len(params)])

        result = actual_output == expected_outputs[test_index]
        user_outputs.append(actual_output)
        tests[test_index].append(result)
        
    except Exception as e:
        tests[test_index].append(False)
        error_message = f"{type(e).__name__}: {str(e)}\\n{traceback.format_exc()}"
        error_outputs.append(error_message)
        user_outputs.append(None)  # No output for this test case

    finally:
        # Capture print output for this test case
        print_output = temp_stdout.getvalue().strip()
        if print_output:
            all_print_outputs.append(print_output.split('\\n'))
        else:
            all_print_outputs.append([])  # Empty list if no print output

        # Reset stdout
        sys.stdout = sys.__stdout__

# Prepare the final output
final_output = {
    "print_output": all_print_outputs,
    "expected_outputs": expected_outputs,
    "user_outputs": user_outputs,
    "test_results": tests,
    "error_outputs": error_outputs
}

# Print the JSON-encoded final output
print(json.dumps(final_output))
json.dumps(final_output)`)
}

export const SPECIFIC_BASE_CODE = {
    python: {
        linked_list: (tests, name, params) => `
if __name__ == '__main__':
    import sys
    import io
    import json
    from math import *

    # Define the number of input params the method expects
    params = ${params}

    # Test cases: input lists
    tests = ${tests}

    class LinkedList:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

    # Function to create a LinkedList from a list
    def create_linked_list_from_arr(arr):
        if not arr:
            return None
        head = LinkedList(arr[0])
        current = head
        for value in arr[1:]:
            current.next = LinkedList(value)
            current = current.next
        return head

    def create_arr_from_linked_list(head):
        res = []
        while head:
            res.append(head.val)
            head = head.next
        return res

    # Function to compare two LinkedLists
    def compare_linked_lists(l1, l2):
        while l1 and l2:
            if l1.val != l2.val:
                return False
            l1 = l1.next
            l2 = l2.next
        return l1 is None and l2 is None

    # Initialize the Solution objects

    user_solution = Solution()
    correct_solution = _Solution()

    # Generate outputs
    error_outputs = []
    all_print_outputs = []
    expected_outputs = []
    user_outputs = []


    for test in tests:
        inputs = [create_linked_list_from_arr(test[i]) for i in range(len(params))]
        expected_output = correct_solution.${name}(*inputs)
        expected_outputs.append(create_arr_from_linked_list(expected_output))

    # Iterate through all test cases
    for test_index in range(len(tests)):
        # Redirect stdout to capture print statements for this test case
        temp_stdout = io.StringIO()
        sys.stdout = temp_stdout

        try:
            # Ensure the correct number of inputs
            if len(tests[test_index]) != len(params):
                raise ValueError(f"Test {test_index}: Mismatch between number of inputs and params")

            # Convert the test inputs to LinkedLists
            inputs = [create_linked_list_from_arr(tests[test_index][i]) for i in range(len(params))]

            # Call the function with the input parameters
            actual_output = user_solution.${name}(*inputs)

            # Compare the function output with the expected output
            expected_output = create_linked_list_from_arr(expected_outputs[test_index])
            is_correct = compare_linked_lists(actual_output, expected_output)

            actual_output_list = create_arr_from_linked_list(actual_output)

            user_outputs.append(actual_output_list)
            tests[test_index].append(is_correct)

        except Exception as e:
            tests[test_index].append(False)
            error_message = f"{type(e).__name__}: {str(e)}\\n{traceback.format_exc()}"
            error_outputs.append(error_message)
            user_outputs.append(None)  # No output for this test case

        finally:
            # Capture print output for this test case
            print_output = temp_stdout.getvalue().strip()
            if print_output:
                all_print_outputs.append(print_output.split('\\n'))
            else:
                all_print_outputs.append([])  # Empty list if no print output

            # Reset stdout
            sys.stdout = sys.__stdout__

        # Reset stdout
        sys.stdout = sys.__stdout__

    # Prepare the final output
    final_output = {
        "print_output": all_print_outputs,
        "expected_outputs": expected_outputs,
        "user_outputs" : user_outputs,
        "test_results": tests,
        "error_outputs": error_outputs
    }

    # Print the JSON-encoded final output
    print(json.dumps(final_output))
    final_output
    `
    }
}

export const convertTestCase = (lines, params = [], types = []) => {
    // If lines is a string, split into array
    if (typeof lines === 'string') {
        lines = lines.trim().split('\n').map(str =>
            str.replace(/^<p>/, '').replace(/<\/p>$/, '').trim()
        );
    }

    // If the first element is not an array, assume flat array and group by params.length
    if (!Array.isArray(lines[0])) {
        const grouped = [];
        for (let i = 0; i < lines.length; i += params.length) {
            grouped.push(lines.slice(i, i + params.length));
        }
        lines = grouped;
    }

    // Now lines is an array of arrays, process each element
    const testCases = lines.map((line) => {
        return line.map((value, idx) => {
            const type = types[idx]?.toLowerCase();

            try {
                // Only parse if type is defined and value is a string
                if (typeof value === 'string') {
                    if (type?.startsWith('list[')) {
                        return JSON.parse(value.trim());
                    } else if (type === 'int') {
                        return parseInt(value);
                    } else if (type === 'str') {
                        return value.toString();
                    }
                }
                // If already a number or array, just return
                return value;
            } catch (e) {
                console.error(`Error parsing value "${value}" for type ${type}:`, e);
                return value;
            }
        });
    });

    return testCases;
};

// Converts JS array to Python-style string
export const toPythonListString = (arr) => {
    if (Array.isArray(arr)) {
        return `[${arr.map(toPythonListString).join(', ')}]`;
    } else if (arr === null || arr === undefined) {
        return 'None';
    } else if (typeof arr === 'string') {
        return `'${arr.replace(/'/g, "\\'")}'`;
    } else {
        return arr.toString();
    }
};

// --- Usage examples ---

const typedLines = [
    [[2,7,11,15], 9],
    [[2,7,11,15], 13],
    [[2,7,11,15], 26]
];
const params = ['nums', 'target'];
const types = ['list[int]', 'int'];

const testsFromTyped = convertTestCase(typedLines, params, types);

export const toCamelCase = (str) => {
    return str?.split(' ').map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
};