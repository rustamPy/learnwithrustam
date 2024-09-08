export const SHORT_CODE = {
    'python': (name, params) => `class Solution:
    def ${name}(self, ${params.join(', ')}):
        pass
`
};

export const BASE_CODE = {
    'python': ((params, tests, name) => 
`if __name__ == '__main__':
    import sys
    import io
    import json


    params = ${params}
    tests = ${tests}

    # Initialize the Solution objects

    user_solution = Solution()
    correct_solution = _Solution()

    # Generate outputs
    all_print_outputs = []
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
            if len(tests[test_index]) - 1 != len(params):
                raise ValueError("The number of params and test is not matching")

            # Call the function with the input parameters
            actual_output = user_solution.${name}(*tests[test_index][:len(params)])

            result = actual_output == expected_outputs[test_index]
            user_outputs.append(actual_output)
            tests[test_index].append(result)
            
        except Exception as e:
            tests[test_index].append(f'ERROR: {str(e)}')
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
        "expected_outputs": expected_outputs,
        "user_outputs" : user_outputs,
        "test_results": tests        
    }

    # Print the JSON-encoded final output
    print(json.dumps(final_output))`)
}


export const SPECIFIC_BASE_CODE = {
    python: {
        linked_list: (tests, name, params) => `
if __name__ == '__main__':
    import sys
    import io
    import json

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
            # If an error occurs, append the error message and a failed status
            tests[test_index].append(f'ERROR: {str(e)}')
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
        "expected_outputs": expected_outputs,
        "user_outputs" : user_outputs,
        "test_results": tests
    }

    # Print the JSON-encoded final output
    print(json.dumps(final_output))
    `
    }
}