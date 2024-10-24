---
title: Add Two Numbers
level: Medium
topics: ["Linked List", "Math", "Recursion"]
groups: ['Dynamic Programming - Essentials']
hint: "Do it"
companies: ['Facebook']

---
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

**Assumptions:**
- The two numbers do not contain any leading zeros, except the number 0 itself.


### Examples

#### Example 1:
![alt text](../../leetcodeAssets/image.png)
- **Input:** 
  - `l1 = [2, 4, 3]`
  - `l2 = [5, 6, 4]`
- **Output:** `[7, 0, 8]`
- **Explanation:** 
  - The numbers represented by `l1` and `l2` are 342 and 465, respectively.
  - The sum is `342 + 465 = 807`.
  - The output linked list is `[7, 0, 8]`, which corresponds to the digits of the sum stored in reverse order.

#### Example 2:
- **Input:** 
  - `l1 = [0]`
  - `l2 = [0]`
- **Output:** `[0]`
- **Explanation:** 
  - The numbers represented by `l1` and `l2` are both 0.
  - The sum is `0 + 0 = 0`.
  - The output linked list is `[0]`.

#### Example 3:
- **Input:** 
  - `l1 = [9, 9, 9, 9, 9, 9, 9]`
  - `l2 = [9, 9, 9, 9]`
- **Output:** `[8, 9, 9, 9, 0, 0, 0, 1]`
- **Explanation:** 
  - The numbers represented by `l1` and `l2` are 9999999 and 9999, respectively.
  - The sum is `9999999 + 9999 = 10009998`.
  - The output linked list is `[8, 9, 9, 9, 0, 0, 0, 1]`, which corresponds to the digits of the sum stored in reverse order.

