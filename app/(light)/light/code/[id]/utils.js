export const STANDARD = `if __name__ == '__main__':
    import json
    tests = _TEST_
    
    o = Solution()
    for i in range(len(tests)):
        try:
            # Extract the number of input parameters and output values
            num_input_params = tests[i]['metadata'][0]
            num_output_values = tests[i]['metadata'][1]
            
            # Ensure we have the right number of inputs
            if len(tests[i]['input']) != num_input_params:
                raise ValueError(f"Expected {num_input_params} inputs, but got {len(tests[i]['input'])}")
            
            # Call the function with the input parameters
            check = o.sample(*tests[i]['input'])

            # Check the result
            if num_output_values == 1:
                bl = check == tests[i]['output'][0]
            else:
                raise ValueError("The test architecture only supports one output value.")
            
            # Append the result to the test case
            tests[i]['result'] = bl
        except Exception as e:
            tests[i]['result'] = str(e)

    print(json.dumps(tests))
`

export const QUESTIONS_MAP = {
    'python': `class Solution:
    def sample(self, arr: list, val: int) -> int:
        # your code
        pass
`
}