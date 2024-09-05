export const STANDARD = `_CLASS_DEFINITION_

if __name__ == '__main__':
    import json
    tests = _TEST_
    
    o = Solution()
    for test_index in range(len(tests)):
        try:
            # Extract the number of input parameters and output values
            target = tests[test_index][-1]
            # Ensure we have the right number of inputs
            if len(tests[test_index]) - 1 != len(params):
                raise ValueError("The number of params and test is not matching")
            
            # Call the function with the input parameters
            check = o.sample(*tests[test_index][:-1])

            bl = check == target
            tests[test_index].append(bl)
        except Exception as e:
            tests[test_index].append(str(e))

    print(tests)
`;

export const QUESTIONS_MAP = {
    'python': (name, params) => `class Solution:
    def ${name}(self, ${params.join(', ')}):
        pass
`
};