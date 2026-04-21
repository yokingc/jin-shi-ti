(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '⚡',
  name: '算法',
  moduleLabel: '⚡ 模块 · 算法分类速查',
  cards: [
    {
      title: '算法分类优先级总览',
      tags: [
        { text: '总览', color: 'teal' },
        { text: '优先级表', color: 'kw' },
        { text: '高频', color: 'blue' }
      ],
      opening: `
        <table style="width:100%; border-collapse:collapse; overflow:hidden; border-radius:10px; border:1px solid #dbe3ee; background:#fff; font-size:13px;">
          <thead>
            <tr style="background:#f1f5f9; color:#0f172a;">
              <th style="width:7%; padding:10px 12px; border-bottom:1px solid #dbe3ee; text-align:center; font-weight:700;">优先级</th>
              <th style="width:12%; padding:10px 12px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">分类</th>
              <th style="width:22%; padding:10px 12px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">关键词联想 → 解法</th>
              <th style="width:30%; padding:10px 12px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">核心思路一句话</th>
              <th style="padding:10px 12px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">热题代表</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef2f2; color:#dc2626; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P0</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">哈希表</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">出现次数 / 快速查找 / 去重 / 两数之和</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">用空间换时间，把查找降到 O(1)</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">两数之和、字母异位词分组、最长连续序列</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef2f2; color:#dc2626; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P0</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">双指针</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">有序数组 / 对撞 / 快慢指针 / 原地操作</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">两端收缩（对撞）或快慢追及，O(n) 解决有序问题</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">三数之和、接雨水、移动零、盛最多水</td>
            </tr>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef2f2; color:#dc2626; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P0</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">滑动窗口</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">最长/最短子串 / 连续子数组 / 不重复</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">维护左右边界，右扩左缩，窗口内保持合法</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">最长无重复子串、找所有字母异位词、最小覆盖子串</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef2f2; color:#dc2626; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P0</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">BFS / DFS</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">连通性 / 最短路径 / 层级 / 图/树遍历</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">BFS 用队列求最短，DFS 用递归/栈求路径</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">岛屿数量、腐烂的橘子、二叉树层序遍历</td>
            </tr>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef2f2; color:#dc2626; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P0</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">二分查找</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">有序 / 旋转数组 / 第K个 / 查找边界</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">每次排除一半，注意左闭右开 vs 左闭右闭边界</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">搜索旋转排序数组、寻找峰值、搜索二维矩阵</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef9c3; color:#a16207; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P1</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">动态规划</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">最优解 / 方案数 / 能否到达 / 最长子序列</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">定义 dp 含义 → 找转移方程 → 确定初始值</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">爬楼梯、零钱兑换、最长递增子序列、打家劫舍</td>
            </tr>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef9c3; color:#a16207; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P1</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">栈 / 单调栈</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">括号匹配 / 嵌套 / 下一个更大/小元素</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">维护单调性，遇到破坏单调的元素就弹出处理</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">有效括号、每日温度、柱状图最大矩形</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef9c3; color:#a16207; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P1</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">链表</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">反转 / 环检测 / 合并 / 第K个节点</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">画图 + 虚拟头节点，快慢指针找环/中点</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">反转链表、环形链表、合并两个有序链表、LRU缓存</td>
            </tr>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#fef9c3; color:#a16207; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P1</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">二叉树</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">路径 / 深度 / 对称 / 序列化 / 公共祖先</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">递归三要素：终止条件 / 左子树 / 右子树</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">二叉树最大深度、路径总和、对称二叉树、最近公共祖先</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#f0fdf4; color:#15803d; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P2</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">回溯</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">排列 / 组合 / 子集 / 所有方案</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">选择 → 递归 → 撤销，用 used 或 start 剪枝</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">全排列、子集、组合总和、单词搜索</td>
            </tr>
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; text-align:center;"><span style="background:#f0fdf4; color:#15803d; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P2</span></td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">堆</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#475569;">第K大/小 / TopK / 合并K个有序</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7;">维护大小为 K 的堆，JS 需手写或用排序模拟</td>
              <td style="padding:10px 12px; border-bottom:1px solid #edf2f7; color:#64748b;">前K个高频元素、数组中第K个最大元素</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:10px 12px; text-align:center;"><span style="background:#f0fdf4; color:#15803d; padding:2px 8px; border-radius:99px; font-weight:700; font-size:12px;">P2</span></td>
              <td style="padding:10px 12px; font-weight:700; color:#6d28d9;">前缀和</td>
              <td style="padding:10px 12px; color:#475569;">连续子数组和 / 区间查询 / 子数组个数</td>
              <td style="padding:10px 12px;">preSum[i] - preSum[j] = 区间和，配合哈希表 O(n)</td>
              <td style="padding:10px 12px; color:#64748b;">子数组求和等于K、和为K的子数组</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top:12px; color:#475569; font-size:13px;">P0 必须手写流畅；P1 要能讲清思路并写出框架；P2 见到能识别解法即可。</p>
      `,
      followupLabel: '关键词速判练习',
      followup: [
        { text: '题目说"最长不含重复字符的子串"→ 你第一反应是什么解法？' },
        { text: '题目说"有序数组中找目标值"→ 你第一反应是什么解法？' },
        { text: '题目说"所有可能的组合/排列"→ 你第一反应是什么解法？' },
        { text: '题目说"连通块数量/最短路径"→ 你第一反应是什么解法？' }
      ],
      bonus: `看到题目先问自己三个问题：① 数据结构是什么（数组/链表/树/图）？② 有没有关键词（最长/最短/第K/所有方案）？③ 暴力是什么，能不能用空间换时间或二分剪枝？三问之后解法基本浮出水面。`
    },
    {
      title: '关键词 → 解法速查表',
      tags: [
        { text: '速查', color: 'teal' },
        { text: '关键词联想', color: 'kw' }
      ],
      opening: `
        <table style="width:100%; border-collapse:collapse; overflow:hidden; border-radius:10px; border:1px solid #dbe3ee; background:#fff; font-size:13px;">
          <thead>
            <tr style="background:#f1f5f9; color:#0f172a;">
              <th style="width:35%; padding:10px 14px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">题目关键词 / 特征</th>
              <th style="width:20%; padding:10px 14px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">→ 优先考虑</th>
              <th style="padding:10px 14px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">原因</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>最长 / 最短</code> + 子串/子数组（连续）</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">滑动窗口</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">连续区间，右扩左缩维护合法窗口</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>有序数组</code> + 查找/搜索</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">二分查找</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">有序 = 可以每次排除一半</td></tr>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>两数/三数之和</code> = target</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">哈希表 / 双指针</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">两数用哈希，三数排序后双指针</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>括号</code> / 嵌套结构 / 合法性</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">栈</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">后进先出天然匹配嵌套</td></tr>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>下一个更大/更小</code>元素</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">单调栈</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">维护递增/递减栈，破坏时弹出即为答案</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>连通块数量</code> / 感染扩散</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">BFS / DFS</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">遍历所有相邻节点，标记已访问</td></tr>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>最短路径</code>（无权图）</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">BFS</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">BFS 按层扩展，第一次到达即最短</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>所有排列 / 组合 / 子集</code></td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">回溯</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">枚举所有选择，递归+撤销</td></tr>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>最优解 / 方案数</code>（可拆子问题）</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">动态规划</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">重叠子问题 + 最优子结构</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>第K大/小</code> / TopK</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">堆 / 快速选择</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">堆维护K个元素，快速选择 O(n) 平均</td></tr>
            <tr><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>连续子数组和</code> = K</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">前缀和 + 哈希</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">preSum[i]-preSum[j]=K，转化为两数之和</td></tr>
            <tr style="background:#fbfdff;"><td style="padding:9px 14px; border-bottom:1px solid #edf2f7;"><code>链表</code> + 环 / 中点 / 倒数第K</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">快慢指针</td><td style="padding:9px 14px; border-bottom:1px solid #edf2f7; color:#64748b;">快指针先走K步或走两倍速</td></tr>
            <tr><td style="padding:9px 14px;"><code>出现次数 / 重复 / 查找</code>（无序）</td><td style="padding:9px 14px; font-weight:700; color:#0f766e;">哈希表</td><td style="padding:9px 14px; color:#64748b;">O(1) 查找，空间换时间</td></tr>
          </tbody>
        </table>
      `,
      followupLabel: '追问点',
      followup: [
        { text: '滑动窗口和双指针的区别是什么？什么时候用哪个？' },
        { text: 'BFS 和 DFS 各自适合解决什么类型的问题？' },
        { text: '动态规划和回溯都能解"方案数"，怎么判断用哪个？' }
      ],
      bonus: `面试时遇到陌生题：先说暴力解法（展示思路），再说"我注意到XXX特征，可以用XXX优化"，最后写优化解。这个过程本身就是加分项，不要上来就沉默。`
    }
  ]
});
