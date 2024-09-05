export const PYTHON_BASE = (func, params, tests, name) => {
    return (

        `${func}

if __name__ == '__main__':
    import json
    params = ${params}
    tests = ${tests}
    
    o = Solution()
    for test_index in range(len(tests)):
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

    print(tests)
`
    )
};

export const QUESTIONS_MAP = {
    'python': (name, params) => `class Solution:
    def ${name}(self, ${params.join(', ')}):
        pass
`
};