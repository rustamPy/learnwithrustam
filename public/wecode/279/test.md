---
params: ['n']
types: ['int']
solution: |
    class _Solution:
        def perfectSquares(self, n: int):
            def dp(n, memo={}):
                if n == 0:
                    return 0
                if n in memo:
                    return memo[n]
                min_r = inf
                for i in range(1, int(n ** 0.5) + 1):
                    min_r = min(min_r, 1 + dp(n - i ** 2))
                memo[n] = min_r
                return min_r
            return dp(n)
---
12
244
1
9