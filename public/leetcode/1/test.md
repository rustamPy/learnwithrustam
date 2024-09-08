---
params: ['nums', 'target']
types: ['List[int]', 'int']
solution: |
    class _Solution:
        def twoSum(self, nums, target):
            table = {v:i for i, v in enumerate(nums)}
            for i in range(len(nums)):
                diff = target - nums[i]
                if diff in table and table[diff] != i:
                    return [i, table[diff]]
---
[2,7,11,15]
9
[2,7,11,15]
13
[2,7,11,15]
26