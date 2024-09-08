---
params: ['nums1', 'nums2']
testFunction: linked_list
solution: |
    class _Solution:
        def addTwoNumbers(self, l1, l2):
            d = LinkedList(-1)
            curr = d
            c = 0
            while l1 or l2 or c != 0:
                if l1:
                    c += l1.val
                    l1 = l1.next
                
                if l2:
                    c += l2.val
                    l2 = l2.next
                
                memory, ans = divmod(c, 10) # divmod(7, 10) -> memory = 0, ans = 7
                curr.next = LinkedList(ans)
                curr = curr.next
                c = memory
            return d.next
---
[2, 4, 3]
[5, 6, 4]


