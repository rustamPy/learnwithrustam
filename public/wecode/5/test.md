---
params: ['s']
types: ['str']
solution: |
    class _Solution:
        def longestPalindromicSubstring(self, s):
            res = ""
            for i in range(len(s)):
                l = r = i
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    if (r - l + 1) > len(res):
                        res = s[l:r+1]
                    
                    l, r = l - 1, r + 1
                
                l, r = i, i + 1
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    if (r - l + 1) > len(res):
                        res = s[l:r+1]
                    l, r = l - 1, r + 1
            return res
---
babad


