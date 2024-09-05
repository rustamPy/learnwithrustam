export const BASES = {
    'python': (func, params, tests, name) => {
        return (
            `${func}

if __name__ == '__main__':

    import sys
    import io
    import json


    params = ${params}
    tests = ${tests}
    
    o = Solution()
    all_print_outputs = []

    for test_index in range(len(tests)):
        # Redirect stdout to capture print statements for this test case
        temp_stdout = io.StringIO()
        sys.stdout = temp_stdout

        try:
            # Extract the number of input parameters and output values
            target = tests[test_index][-1]
            # Ensure we have the right number of inputs
            if len(tests[test_index]) - 1 != len(params):
                raise ValueError("The number of params and test is not matching")

            # Call the function with the input parameters
            check = o.${name}(*tests[test_index][:-1])

            bl = check == target
            tests[test_index].append(check)
            tests[test_index].append(bl)
            
        except Exception as e:
            tests[test_index].append(str(e))
            tests[test_index].append(False)

        # Capture print output for this test case
        print_output = temp_stdout.getvalue().strip()
        if print_output:
            all_print_outputs.append(print_output.split('\\n'))

        # Reset stdout
        sys.stdout = sys.__stdout__

    # Prepare the final output
    final_output = {
        "print_output": all_print_outputs,
        "test_results": tests
    }

    # Print the JSON-encoded final output
    print(json.dumps(final_output))
    `
        )
    }
};

export const QUESTIONS_MAP = {
    'python': (name, params) => `class Solution:
    def ${name}(self, ${params.join(', ')}):
        pass
`
};