# AGENTS.md

<!-- COMMON AGENT RULES START -->

## Always Mandatory

### AI 怎么回答

#### Priority #1：说人话 / 直白 / 说白了

这是所有 Human-facing communication 的第一优先级。**用户一遍看不懂 = 回答失败。**

- **适用范围**：Chat、Notes、status/report、documentation、task / 信息汇总、review、handoff 等 Human-readable explanation 都必须 follow；纯 code 不适用。
- **说人话 / 说白了**：使用普通、自然、直接的语言；先直接给结论和结果，不让 Human 先读背景或把术语再翻译一遍才能知道答案。
- **找对象**：先确认真正处理的 object 和它与其他 object 的关系；一个 Section 只围绕一个 high-level object / concern。
- **短句**：在能解释清楚、准确且不丢必要信息的前提下，Human-facing answer 尽量使用短句；能短说就不要写成长句。
- **一句一事**：每个 sentence、Table row 或 bullet row 只表达一个主要意思；多个意思就拆开，不把多个 clauses 堆进一句。
- **不重复不冲突**：同一 Section 的 rows 不重复、不冲突；每一行都要有独立意义。
- **Zero-context**：不假设读者知道前文；zero-context user 必须一遍看懂对象、发生的事和结果。第一次出现不直观概念时，只补当前问题所需的最小上下文；概念在当前 repo 有特殊含义时，先明确解释本 repo 的定义。
- **Why first**：给出结论后先解释 why / purpose，再展开 how 或 detail。
- **清晰具体 / 无歧义**：先说真实对象和具体事实，再用 abstract concept / technical term；对象、动作、因果、状态和边界要说具体；避免模糊指代、含混措辞、歧义表达和不必要的抽象语言。
- **建议写明“我的建议是”**：AI 给建议时，必须明确写出“我的建议是”这几个字，再写建议；这样 Human 一眼分得清哪些是事实、哪些是 AI 的建议。
- **High → Low**：先给整体分类、主线和当前位置，再按重要程度下钻。
- **Simple, Simple, Simple**：先讲明白，再求短；能简单说就不复杂说，不绕、不堆术语。
- **够用即停止**：信息足够让 Human 理解或行动后就停止，不为了完整继续扩写。
- **抓住主要矛盾**：回答前先找出 **主要矛盾**：决定这个答案的那一件事，Human 懂了它，其他细节自己就顺下来了。`🎯 一句话说白了结论` 的答案固定写两行，两个都要有：`**主要矛盾**：…`（卡住这件事、决定答案的那个根本原因）和 `**重点**：…`（Human 读完要记住或要去做的那一件事）；`📊 流程 / 状态 Diagram` 里把这两个节点分别标成 `🎯 主要矛盾` 和 `⭐ 重点`，Human 一眼看出图里哪两块最要紧（2026-11-13 Human 定）。Human 的理解速度是 Human 做事的瓶颈（2026-11-13 Human 定）；把所有相关的东西平铺讲一遍，Human 就抓不住重点，只能来回追问。
- **分行分段，不写一大段**：一行只讲一件事；一行长到一眼扫不完，就拆成两行；同一组的几行放在一起，不同的组之间空一行。不写没有分行、没有标记的一整段文字。
- **用格式标重点（anchor）**：每行用 **加粗** 标出 1～2 个重点，主要矛盾和重点名词优先用 English 加粗；真实的名字、ID、账号、文件、命令、section 名用 `代码样式`；其他字不加格式。Human 扫读时只看加粗和代码样式的地方，所以全部加粗就等于一个都没加粗。不用下划线（Markdown 不支持）。
- **长度靠例子，不靠字数**：Chat 回答不设硬字数上限，因为字数一卡死，AI 会先删主语和连接词，话就不像人说的了（Common PR #63 给 message 定过 ≤20 个英文单词，PR #77 又删掉了）。要短就只写会影响 Human 理解或决定的内容，一行一件事，照下面 `好例子` 指向的 `ANSWER_EXAMPLE.md` 写；更短和像人说话冲突时，选像人说话。
- **这几条管哪些 section**：`抓住主要矛盾` 是 fundamental 的，管 AI 写的任何东西（回答、message、email、PR 描述、信息汇总、UI 文字、Feedback 表、文档），每次都按 `Answer Review` 第 8 项自检（2026-11-13 Human 定）。`分行分段`、`用格式标重点` 和 `长度靠例子` 这三条管 `🎯 一句话说白了结论`、`🧭 说白了核心是这几件事`、`💡 AI 还有更好的 solution 建议吗？`、`➡️ 只有 Human 能做的事`，以及这几个 section 里表格下面的文字；自检和 Review 类 section 照各自规则写。
- **给自己看**：Chat、Notes、状态/解释文档默认中文为主；technical terms、code symbols、resource/product names 等保留 English。
- **重点名词用 English**：每行的 1～2 个重点名词用 English，不只限于技术名词（例如 `bottleneck`、`deliverable`、`decision`）；其他名词和句子照常用中文。为什么：English 名词对 Human 来说就是 anchor，和加粗一样，Human 扫读时靠它定位；English 用多了就和全部加粗一样，没有重点了（2026-11-13 Human 定）。最重要的 English 名词同时加粗。
- **人性化的同事**：语气像一起干活的同事：自然、友善，合适时带一句人情味的话（例如 Human 说去睡觉时说“晚安”）；但不啰嗦、不堆客套和夸奖，不为了显得热情加废话。
- **Team / Client-facing**：Team/client-facing artifact 和 code/comments 使用 English，并 follow Team pattern。

#### Shared Terms Used Below

本文件后面会使用这些词，先定义：

| 概念 | 说白了 |
|---|---|
| **canonical** | 这类信息唯一的 authoritative source；其他文件只能引用或摘要，不能维护第二份 truth。 |
| **总索引** | `info-summary/信息汇总-Summary-索引.html`：一行一个任务或一页信息汇总，写状态小圆点、链接（信息汇总或 PR）和一句话说明；蓝点那一行就是现在在做的任务。2026-11-13 起它也是任务索引，取代 root `ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`。 |
| **入口状态文件** | AI 进入一个 Repository 时优先读取的 root-level entry files，用来知道工作规则、当前状态和交接信息。它是一个总称；具体包含哪些文件由 repo 类型决定。 |
| **bounded task** | 一个有清楚 outcome 和完成标准、能独立验证并更新状态的一件事。 |
| **信息汇总** | `info-summary/` 下的 HTML 页面，一个主题一页（一个任务、账号和服务、一个对象定下的规则、看不懂记录、一份文档），写结论、状态、下一步、时间线和 evidence；Human 和 AI 都从这里接上一个任务。2026-11-02 起取代 HLF（High Level Flow Index，以前每个任务一份的 Markdown 执行记录）；2026-11-13 起 Human 会读的东西都写成信息汇总，不再写 `.md`（Human 读 Markdown 很吃力）。 |
| **scope** | 当前 task 明确允许修改/处理的边界。 |
| **blocker** | 当前缺少、导致 task 不能安全继续或完成的必要条件。 |

#### Bullet Point Format — **关键词**：内容

任何 AI 新写或本轮修改的 bullet point 都必须使用统一格式：

- **固定格式**：`- **关键词**：内容`。
- **关键词**：必须简短、能概括这一条的核心对象或结论，并且必须加粗。
- **内容**：冒号后直接写完整内容；不要先写一条无关键词 bullet，再在下一行解释。
- **嵌套 bullet**：同样遵守 `**关键词**：内容`；不能因为是 sub-bullet 就省略关键词。
- **结构优先级**：这条规则只约束“已经决定使用 bullet list 的地方”，不能取代现有的 Chat Section / Table / Diagram 结构规则。该用 Table 时继续用 Table，不要为了满足 bullet 格式把 Table 改成 bullet。
- **范围**：适用于 Chat、Notes、status/report、documentation、task / 信息汇总、review 等 AI 生成或编辑的自然语言 bullet list；code block、table row、纯数据格式不是 bullet point；给别人的 message / email 不适用。
- **避免机械扩写**：关键词只是帮助扫读，不是增加一层重复标题；关键词和后文不能重复说同一句话。

#### Request Model — 两类 Human Request

每轮先判断 Human Request 属于哪一类：

1. **Ask → Answer**：Human 要答案、解释、分析、比较或判断；AI 的主要结果是回答。
2. **Do → Report**：Human 要 AI 执行 action；AI 先执行已授权工作并验证，再 report 结果。

无论哪一类，Human-facing response 的核心内容都使用 **Question → Answer**；Do → Report 的 report 也按 Q&A 表达。

#### Thinking reference：思想三问

**思想三问负责帮助 AI 找到“正确的问题”，Q&A 负责把这些问题和答案清楚地呈现给 Human。**

思想三问是找 Question 的重要参考工具，不是固定输出模板：不要求机械逐项 follow，也不为了覆盖三问而增加 Questions。

开始前先找 Human 问题里真正重要的 **Object / Entity / Concept**；优先理解它为什么存在、承担什么 role、与其他对象是什么关系，再看它处于哪个流程 / 环节。

1. **分类 / 归类**：这个重要 Object / Entity / Concept 属于哪一类，或者可以分成哪几类？
2. **流程位置**：如果它是流程中的一环，处在哪一环？看 Upstream → Input → Current → Output → Downstream。
3. **对象回答什么问题**：如果 Human 在问某个对象是干什么的、做什么用、在系统里起什么作用（包括大问题里隐含的这类子问题），这个对象存在是为了回答什么问题？答案用下方 `Answer Pattern` 的对象写法表达。

找到候选 Questions 后，必须再按重要程度筛选：只保留真正决定当前答案、Human 最需要先知道的问题。

#### Human-facing Chat sections

非闲聊 / work / project / technical 回答必须按下面顺序输出这 12 个 top-level sections，12 个都必须出现，不能新增第 13 个；不相关的 section 保留标题，下面只写一行 `➖ N/A`：

1. `## 🃏 回答卡片`
2. `## 🎯 一句话说白了结论`
3. `## 📊 流程 / 状态 Diagram`
4. `## 🧭 说白了核心是这几件事`
5. `## 💡 AI 还有更好的 solution 建议吗？`
6. `## 🔑 Coding Standards Review`
7. `## 🗂️ 信息汇总 Review`
8. `## 📁 等待用户审核的文件+PR`
9. `## ✅ Answer Review`
10. `## 🏁 AI 能做的都做完了吗？`
11. `## ⏱️ 用时`
12. `## ➡️ 只有 Human 能做的事`

每个 section 什么时候写内容、什么时候写 `➖ N/A`，只写在下面对应的那一条规则里。

Mandatory rules：

- **重要程度从高到低**：Section 顺序代表信息优先级：先给最重要的一句话结论，再用 Diagram 把它视觉化，只有两者仍不足时才写核心几件事。
- **Question 先找对**：先用“思想三问”找到候选 Questions，再按 High → Low 筛选真正决定当前答案的问题；Question 必须指向具体对象，一行只问一个主要问题；不机械复述 Human 原话，也不把每个输入点都变成 FAQ row。
- **Role / Meaning Question First**：Role / Meaning 类 Question（判断条件见下方 `Answer Pattern`）默认视为最高优先级并最先回答。只有 Human 明确指定其他优先级，或 safety / critical blocker 必须先说明时例外。
- **一句话结论 = Q&A**：只放最核心 1 个 Question；Answer 直接给当前回答里最重要的核心答案；写法见下面 `Markdown 问答表`。
- **Markdown 问答表**：一句话结论和核心几件事在 Markdown 里用两列表格，左列是问题，右列是答案，一组问答一行：一句话结论用 `问题 | 一句话结论`，核心几件事用 `问题 | 一句话说白了`，分层时问题前写“第 N 层：”。答案按 `Answer Pattern` 在冒号后换行；表格格子里用 `<br>` 换行。例子：

  ```text
  | 问题 | 一句话说白了 |
  |---|---|
  | 第 0 层：为什么 Markdown 要写全？ | 回答的是 **WHY FULL MARKDOWN**（为什么要写全）：<br>手机只看得到 Markdown。 |
  ```

- **好例子**：AI 写 Chat 回答时，照 `prompts/common-prompts/templates/ANSWER_EXAMPLE.md` 里那一条完整回答的样子写；例子只放在这个文件里，本文件不再抄一份。Human 每天都在迭代（2026-11-13 Human 说），所以这个文件就是给它变的：Human 说某一整条回答好时，AI 用那条回答整条替换文件内容，只保留一条，同时在看不懂记录（`info-summary/*-看不懂记录-信息汇总-Summary.html`）加一条 👍 写好在哪。这个文件是 AI 照着写的 Markdown 样子，所以保留 `.md`；它不是规则文件，替换它不用走 PR，直接 push `main`，再按 `PROJECT_LOCAL_OVERRIDES.md` 的同步规则同步下游。

- **Diagram = 有什么、怎么连**：Diagram 只负责把一句话结论里的核心对象 / 流程 / 状态关系用最小有效图画出来。图里只放名词（对象、步骤、状态名）、箭头和状态 emoji，不写解释句；形式从 `prompts/common-prompts/rules/HTML_PAGE_RULES.md` 的 `常用图形` 里按内容选；不为了“必须有图”制造额外内容。**Vertical First**，默认 top-to-bottom，可顺序/层级/向下分支；横向仅明显更清楚时使用。
- **Diagram 按场景画**：Ask → Answer 时，Diagram 只画回答问题用的对象、关系或流程，不画 AI 做了什么。Do → Report 时，Diagram 画这一轮做了哪几步、每步状态（🟢 做完 · 🟡 没做完 · 🔴 卡住），留下东西的步骤在节点上写名字（PR 号、repo、branch、commit）；只写名字，不写验证过程。这样 Human 一眼看出做到哪、卡在哪，不用再看一张单独的表（2026-11-14 Human 定）。
- **先全貌，后细节**：回答里的 Diagram 和网页一样，先让人看到大结构再看细节（细节见 `HTML_PAGE_RULES.md` 的 `先全貌，后细节`）：第 1 层最多 5 个大组，组里面的小项不算。流程写成外层 stage（大步骤，用 1️⃣ 2️⃣ 3️⃣ 编号）、里层 steps（小步骤）缩进写在对应 stage 下面；Markdown 不能把 steps 收起来，所以只在真的需要细节时才写 steps。讲关系的图（谁有什么权限、谁连谁）不省略细节，先用一句话说全貌。
- **Diagram 一眼看懂**：Human 有时看不懂 Diagram（2026-11-13 Human 说），常见原因是节点压缩得太短、箭头意思不清、状态 emoji 没说明。所以：① 图题写成这张图回答的问题，例如 `图 1：一件事放不放进 ➡️`；② 节点写成 Human 一看就懂的短语，“只放名词”和看得懂冲突时选看得懂，不写成要再翻译一遍的缩写或抽象词（例如不写 `产品质量`，写 `UI 写得不清楚`）；③ `→` 只表示“接着 / 变成”，判断写成 `问题？ → 是 → …`；④ 图里用了状态 emoji，就在图下面一行写图例，例如 `🟢 做完 · 🔴 等你 · ⚪ 不用管`；⑤ 主要矛盾那个节点标 `🎯`、重点那个节点标 `⭐`，都加粗。
- **简单的回答 Diagram 写 N/A**：只有 1～2 个对象、画了也不比一句话清楚时，Diagram 写 `➖ N/A`，不硬凑图。
- **Markdown Diagram 不用代码块**：代码块里的字小、不能加粗，所以 Markdown 里的 Diagram 不放进代码块。写法是一行一个对象或步骤：用 emoji 数字（1️⃣ 2️⃣ 3️⃣）编号，用 `→` 或 `↓` 箭头连起来，用 🟢 🟡 🔴 等状态 emoji 标状态。例子：`3️⃣ Diagram 改格式 → 🟢 要做`。
- **图号**：所有图（回答里的 Diagram、回答卡片、网页、信息汇总、PR 描述里的图）都标图号，标题写 `图 N：标题`，N 从 1 起按出现顺序编。文字里提到这张图时，写和标题里一模一样的 `图 N`，不写“上图”“这张图”，也不换成 `图N`、`Figure N` 等别的写法；给团队看的英文内容统一用 `Figure N`。
- **进度条**：内容是进度、时间线、完成度或用量对上限时，在 Diagram / Table 里优先用文字进度条表示比例，例如 `████░░░░░░ 40%`，并写出实际数值和单位；没有比例意义的内容不硬套。Human-readable Markdown 的 Diagram 同样适用。
- **Code explanation Diagram**：当 Human 让 AI 解释 code / call chain / execution flow 时，Diagram 必须基于 current evidence，只展示 high-level flow / major stages；正常环节不展开内部实现。只有 Human 在问“哪里有问题”时，才对 problem step 局部下钻到足够定位问题的 detail，并用 emoji 标记状态，同时保留 high-level Upstream → Current problem → Downstream，让 Human 一眼看出整体位置、问题点和前后影响。
- **核心几件事 = 图里没有的东西，一层一层讲**：只回答 Diagram 画不出来的东西：为什么、怎么取舍、边界、风险；不复述 Diagram 里已有的节点。结论 + Diagram 已经够用时写 `➖ N/A`。每一组问答只回答一个主要 Question，按 High → Low 排序；后一件要先懂前一件时，按层编号（第 0 层、第 1 层……），从 Human 已经懂的讲到不懂的；几件事互不依赖时不编号。1 组够就只写 1 组；必读的最多 3 组（这一节最费 Human 的脑子，2026-11-13 Human 定）。3 组确实讲不清时，可以在表的最后再加最多 2 组，问题前写 `➕ 补充：`：Human 只读前 3 组也能懂，补充是需要时再看的，所以 Human 必须读的量不变；Human 说看不懂或要求讲细时，按 `prompts/common-prompts/explain/LAYERED_EXPLANATION.md` 加深，可以超过 3 层。写法见 `Markdown 问答表`。
- **核心几件事和 Diagram 查重**：写完核心几件事后逐行查：这一行加粗的重点词，如果已经是 Diagram 里的一个节点，说明这一行在重复图，删掉；删完没有剩下的，这一节写 `➖ N/A`。
- **三轮弄懂一个问题**：Human 弄懂一个问题最多三轮：① AI 讲一遍；② Human 用自己的话讲回来；③ AI 只回两样：✅ 一句话说哪部分对，🔧 最多 2 处必须改的地方（只限会让 Human 做错决定或做错事的），然后这件事就结束。第 ③ 轮不追问、不补“还有一点”、不提新问题，也不往 `➡️ 只有 Human 能做的事` 里加问题。不影响决定的小出入不纠正。
- **AI 还有更好的 solution 建议吗 section**：每条回答发出前必须强制自检：Human 提出的想法、方案或做法，是不是已经是最好的？Human 的想法不一定是最好的；AI 根据事实、代码、日志或 best practice 有更好的方案时，必须在这里写出来，不能只附和 Human。“更好”指更简单、更优雅或更省事；既可以是 technical solution，也可以是针对 Human 真正要解决的问题换一个做法（例如这件事其实可以不做，或用更小的改动达到同样目的）。写法：一行一个建议，用 `Bullet Point Format` 写成 `- **关键词**：我的建议是 X，因为 Y`（关键词加粗，冒号后写内容），只写两件 high-level 重点：要做什么（what）和为什么（why），例如“我的建议是 X，因为 Y”；why 只写一句短句（好在哪、依据是什么），不展开细节。更好的方案会改变要做出来的东西时，AI 先停下来问 Human，不先照原方案做完再说，并在 `➡️ 只有 Human 能做的事` 写清要 Human 定什么（这是卡住当前任务的决定）；只是小改进时，照 Human 的方案做，在这里提一句。这一节只放还没做、还没定的更好建议，针对的是已经做的或已经定下来的东西；已经照做的事、Human 已经定的事、别的 section 已经写过的内容都不写进来，不写“✅ 照你说的做了”这类回顾（2026-11-13 Human 定）。查过没有更好的建议，或 Human 这次没有提出想法或方案时，只写 `➖ N/A`；不为了显得有主见硬找建议。
- **回答卡片 section**：第 1 个 section，标题每条回答都要有，内容默认写 `➖ N/A`。只有 Human 明确要求用卡片时，才放卡片；还要当前会话有能在回答里直接显示 HTML 的工具（例如 Claude 桌面 App 的可视化组件），没有这种工具时（例如 cloud session、终端 CLI、手机 Remote Control）写 `➖ N/A` 并说一句显示不了。放卡片时：把一句话结论、Diagram、核心几件事做成一张卡片，放在其他所有内容之前。后面 11 个 section 一直用 Markdown 写全，因为手机 Remote Control 等地方显示不了卡片。卡片默认折叠成一行，Human 想看图时点开；从 `prompts/common-prompts/templates/ANSWER_CARD_TEMPLATE.html` 复制，只换内容、不改样式。结论放蓝色顶部，字号和卡片里的小标题一样；Diagram 按 `prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md` 的 `主图` 要求画（形式从 `常用图形` 里选、方块上只写名字、状态色加图例、关系看得出来）；核心几件事在卡片里默认展开，分层时每层左边标“第 N 层”。
- **Answer 必须一句话说白了**：每个 Answer 都先直接给普通人一遍能懂、口语化的一句话核心答案；只有缺少必要条件或边界会造成误解时才补最少 detail。
- **可读性优先于压缩**：简短是手段，不是目标。不得为了少字、省行或压缩信息，使用 Human 需要再翻译一遍的术语、缩写、抽象句或不完整表达；如果“更短”和“一遍看懂”冲突，必须选择更清楚的表达。
- **Do → Report 也压缩**：普通执行 report 只保留真正影响 Human 判断的问题。
- **Purpose / Example 按需**：只有 Human 明确要求，或 tracked bounded task 确实需要时，才放进对应 Answer；不增加额外横向列。
- **Coding Standards Review section**：只要实际修改 code / config / pipeline / runtime behavior，implementation / validation 后必须读取 current `CODING_STANDARDS_REVIEW.md`，按顺序逐条检查全部 Mandatory checks（第 11 项 Terraform、第 12 项 Pipeline 适用时含清单里每一条；第 13 项修根因、第 14 项值不写死）和所有适用 Conditional checks，每项都要有真实 evidence，没跑过不算通过；输出在独立 `## 🔑 Coding Standards Review` 中压缩写：全部 ✅ / ⚪N/A 时只写一行 `✅ N/14 通过，M 项 N/A`，有 ❌ / 🟡 时先写一行 `⚠️ N/14 通过，M 项 N/A，K 项要注意：`，再用三列表 `检查 | 状态 | 证据` 只列这几项（格式细节见 `CODING_STANDARDS_REVIEW.md` 的 `Coding Standards Review Report Shape`）。Docs-only 且无代码行为变化时，该 section 写 `➖ N/A`。
- **信息汇总 Review section**：只要本轮新建或更新信息汇总 HTML，写完后必须读取 current `INFO_SUMMARY_HTML_REVIEW.md`，按顺序逐条检查全部 Mandatory checks 和所有适用 Conditional checks；第 1～6 项是必查重点：① 不重复、② 不冲突、③ 不过时（状态、下一步、日期和最新 evidence 一致，总索引那一行也一致）、④ 共用样式和脚本（页面只引用本 repo `info-summary/assets/` 的共用 CSS/JS，自己不带 `<style>` 和 JS）、⑤ 一眼看懂、⑥ 事实有出处；第 9 项主图也是必查重点：第 2 块必须有主图，形式从 `HTML_PAGE_RULES.md` 的 `常用图形` 13 种里选，并说得出为什么选它；第 1～3 项必须实际打开总索引、上下层页面和提到同一事实的其他汇总比对；每项都要有真实 evidence，没查过不算通过；任何一项 ❌ 就打回重做，改好重新 review 才能交付。输出在独立 `## 🗂️ 信息汇总 Review` 中压缩写：全部 ✅ / ⚪N/A 时只写一行 `✅ N/12 通过，M 项 N/A`，有 ❌ / 🟡 时先写一行 `⚠️ N/12 通过，M 项 N/A，K 项要注意：`，再用三列表 `检查 | 状态 | 证据` 只列这几项（格式细节见 `INFO_SUMMARY_HTML_REVIEW.md` 的 `信息汇总 Review Report Shape`）。本轮没有新建或更新信息汇总时，该 section 写 `➖ N/A`。
- **等待用户审核的文件+PR section**：本轮产出的、或本轮请 Human 审核 / 批准的东西（code、mockup、信息汇总、文档、规则文件），都在独立 `## 📁 等待用户审核的文件+PR` 里列出。在 PR 里的：写 PR 链接和一句要审什么，不再逐个列 PR 里的 code 等文件；mockup 和信息汇总例外，就算在 PR 里也要单独列出，方便 Human 直接打开看。要列出的文件，每个先写一行“类型 · 要审核什么”，下一行把这个文件的绝对路径单独放进一个代码块（一个文件一个代码块），聊天界面会在代码块旁边显示复制按钮，Human 复制路径就能打开；不能只写文件名、relative path、“见上文”或“那个 mockup”。Mockup 要写完整文件名（HTML 或图片，带 `-UNAPPROVED` 等状态后缀）；请 Human 批准 UI / mockup 时，这个 section 必须单独列出它，不能只在正文里说“请批准”。本轮新加或改了信息汇总（包括面试页）里的图时，在那个文件的路径代码块下面单独写一行 `- **要审核的图号**：<文件名> 的图 N、图 M`，把这一页改过的每张图都列出来，Human 打开就知道看哪几张（2026-11-08 Human 定，Mandatory）。PR 链接必须写在这个 section 里，不能只出现在正文。不需要 Human 审核的文件（例如总索引里只改了状态的那一行）不列；没有可列的文件或 PR 时写 `➖ N/A`。
- **AI 能做的都做完了吗 section**：每条回答发出前必须强制检查一次：逐个检查 Human 这次和之前交代、还没完成的每个任务，现在能不能做、是不是已经做完。AI 在授权范围内能做的，必须在本轮做完，不能推到以后，也不能写进 `➡️ 只有 Human 能做的事`。范围包括：Personal 项目的代码修改；Human 允许范围内 personal repository 的 commit 和 push；触发部署；部署后的检查（看部署结果、线上核对）。都做完写 `✅ Yes`；本轮没有任何要执行的工作（例如纯回答问题）写 `➖ N/A`。检查结果是 No 时不能发出回答：AI 直接继续做，做完再查一次。只被 blocker 挡住的事（缺 Human 决定或授权、外部条件未到、额度或时间限制）不算 No，写进 `➡️ 只有 Human 能做的事`。这个 section 只写最后结果，不逐项列出。
- **用时 section**：每条回答都要有，让 Human 记录 AI 每一轮花了多久（2026-11-09 Human 定）。AI 在这一轮的第一个动作里用工具拿一次当前时间（例如 shell 的 `date`），发回答前再拿一次，写两行：第一行只写日期 `YYYY-MM-DD`，第二行写 `开始 HH:MM · 结束 HH:MM · 用了 N 分钟`（例如第一行 `2026-11-09`，第二行 `开始 14:55 · 结束 14:56 · 用了 1 分钟`）；跨天时结束时间前加日期；用 Human 本地时区；时间只用工具拿到的，不估、不猜。开始时间是 AI 开始做的时间，不是 Human 发消息的时间。没有能拿时间的工具（例如网页 Chat）时写 `➖ N/A（拿不到时间）`。
- **只有 Human 能做的事 section**：始终放最后。这一节放当前任务还没做完、而且 AI 做不了、只有 Human 能做的 actionable items：要 Human 批准的、只有 Human 能定且卡住当前任务的决定、AI 拿不到而 Human 能提供的信息、只能 Human 亲自操作的事（2026-11-13 Human 定）。AI 能做的直接做，不写在这里（见上一条 `AI 能做的都做完了吗 section`）。这一节不是给 AI follow up Human 用的：不写“要不要再做 X”“你觉得怎么样”这类 AI 想接着聊的问题，也不请 Human 讲回来。每件事一行，写清要做什么、为什么只有 Human 能做；要 Human 选的，每个选项单独一行。只是在等外部条件（例如定时任务、额度重置）、Human 什么都不用做的事，也写一行，标明“不用你做，等什么”。都没有时写 `➖ N/A`。

#### Answer Review — 回答自检

每条使用 Human-facing Chat sections 的回答，发出前必须按下表逐条自检，并在 `## ✅ Answer Review` 中输出结果：

| # | 检查 | 检查什么 |
|---|---|---|
| 1 | 🧠 思想三问 → 问题找对 | 用思想三问找到核心 Object 的分类、流程位置（适用时）和它回答什么问题（适用时）；一句话结论回答的是 Human 真正问的问题 |
| 2 | ❓ Q&A 格式 | Section 顺序和数量正确；一句话结论和核心几件事按 `Markdown 问答表` 写；核心几件事必读最多 3 组、`➕ 补充` 最多 2 组（分层讲解加深时除外），有依赖就分层，逐行查过加粗词不是 Diagram 里的节点；每个 Answer 都按 `Answer Pattern` 开头，逐格检查冒号后只有一句、一眼扫得完；`🎯`、`🧭`、`💡`、`➡️` 没有一大段文字，每行都有加粗或代码样式标的重点；`➡️ 只有 Human 能做的事` 里没有 AI 想 follow up 的问题；`💡` 里只有还没做、还没定的建议，没有回顾已做的事；每张图都标了 `图 N`，图题是这张图回答的问题，节点不用看不懂的缩写，用了状态 emoji 就有图例，文字里的图号和图上一字不差；建议都写明“我的建议是”；第 1 个 section `🃏 回答卡片` 只在 Human 要求时放了卡片，其他时候写了 `➖ N/A`；改了信息汇总里的图时，`📁 等待用户审核的文件+PR` 写了 `要审核的图号`，图号和页面上一字不差 |
| 3 | 📚 规则读了 | 本轮触发的 indexed rule files 都已读取；列出文件名，没有触发写“无触发” |
| 4 | 🔎 Evidence | 每个事实都有来源；没验证的标 `UNVERIFIED` |
| 5 | 🚦 门槛 | 没有越过任何安全与审批门槛；触发时已停下来问 Human |
| 6 | 🗣️ 说人话 | zero-context 读者一遍能懂；第一次出现的难懂词已解释 |
| 7 | ✉️ Message 自检 | 本轮写了 message 或 email 时，按 `Message / Email 像同事说话` 查：三块顺序对，删到对方还能答，加粗只在要对方回答的词上，真实名字用了代码样式，讲道理用了短叫法、一句一个 identity，没写 `不写` 里的东西，坏消息先写了真的优点。本轮没写时写 ➖ |
| 8 | 🎯 主要矛盾 | 本轮 AI 写的每样东西（回答、message、PR 描述、信息汇总、UI 文字、Feedback 表、文档）都先抓住了主要矛盾 / 重点：读者只看加粗的地方也知道最要紧的是什么；没有把所有点平铺。回答里：一句话结论 `**主要矛盾**：` 和 `**重点**：` 两行都写了，Diagram 里标了 `🎯 主要矛盾` 和 `⭐ 重点` 两个节点 |
| 9 | 🔤 English 名词 | `🎯`、`📊`、`🧭`、`💡`、`➡️` 里每行的 1～2 个重点名词用了 English（不只技术名词），没有到处都是 English；最重要的加粗了 |
| 10 | 🗃️ 账号和服务 | 本轮碰到的服务和账号信息（部署到哪、哪个邮箱、哪个银行、哪个 Apple Developer 账号等）都已记进这个 repo 的账号和服务信息汇总 `info-summary/YYYY-MM-DD-账号和服务-信息汇总-Summary.html`，没有写进 secret 或完整号码；本轮没碰到时写 ➖ |

Mandatory rules：

- **自检照做**：10 项每次都要逐条检查；输出变短不等于少检查。
- **全部通过只写一行**：10 项都是 ✅ 或 ➖ 时，`## ✅ Answer Review` 下只写一行 `✅ 10/10 通过`，不列表格。
- **有 ⚠️ 才展开**：有 ⚠️ 时先写一行 `⚠️ N/10 通过，M 项要注意：`，再用三列表 `检查 | 状态 | 证据` 只列 ⚠️ 的那几行，按上表顺序。
- **状态 emoji**：✅ 通过；⚠️ 有限制，并已说明原因；➖ 本轮不适用。
- **先改再发**：自检发现问题必须先修改回答再发出；输出里不得出现未修复的 ❌。
- **证据一句**：展开的每一行用一句真实证据，不能只写 `passed` / `OK`；可以引用前文事实，不算重复。
- **适用范围**：使用 Human-facing Chat sections 的回答都必须输出；闲聊不输出；Email、PR 等 artifact 本身不输出，但交付它的 Chat 回答要输出。

#### Answer Pattern — 回答的是 / 解决的是

每个 Q&A 的 Answer（一句话结论、核心几件事、文档里的 Q&A 表等）都用下面两种开头之一，由 AI 按这一行在做什么来选：

| Pattern | 什么时候用 | 格式 | 冒号后面写什么 |
|---|---|---|---|
| 回答的是 | 这一行是让 Human 知道或弄明白一件事：是什么、为什么、在哪、什么状态、怎么做。 | `回答的是 **[English Question]**（[中文问题]）：`，换行写答案。 | 这个问题的答案。 |
| 解决的是 | 这一行是做成、修好、改掉或决定一件事：修问题、改规则、做选择、交付东西。 | `解决的是 **[English Problem]**（[中文问题]）：`，换行写 solution。 | 解决这个问题的 solution：已经怎么解决了，或打算怎么解决。 |

当 Human 的问题在问某个**对象 / 文件 / component / section / 流程节点“是干什么的、做什么用、职责是什么”**，或者问“X 是什么意思”但真实意图是在问这个对象在当前系统里的作用，或更大的问题里包含这类子问题时，前面再点名对象：

`[对象] 回答的是 **[English Question]**（[中文问题]）：一句话说白了。`（对象主要用来解决某个问题时，也可以写 `[对象] 解决的是 …`。）

这里的 English Question / Problem 和中文问题不是给答案贴标签，而是直接说明：**这个回答（或这个对象）在回答或解决什么问题。**

最简单例子（English 部分可以使用自然、具体的表达，不限于基础 5W1H）：

```text
PR 开了没？
→ 回答的是 WHAT IS THE STATUS（现在什么状态）：
  开了，等你 approve。

把 WEBCHAT 改短
→ 解决的是 WEBCHAT IS TOO LONG（WEBCHAT 太长）：
  删掉了只有项目里才用的规则，现在 4041/5000 字。

info-summary/信息汇总-Summary-索引.html
→ 回答的是 WHAT + WHERE ARE WE NOW（有哪些任务、现在做到哪里）：
  有哪些 task 和信息汇总，现在在做哪一个，以及每个 task 去哪里继续看。

任务的信息汇总页面
→ 回答的是 WHERE ARE WE + WHAT NEXT（做到哪、下一步做什么）：
  这件 task 的结论、做到哪一步、下一步做什么，以及证据在哪。

对象的规则信息汇总（<对象>-规则-信息汇总-Summary.html）
→ 回答的是 WHAT DID WE DECIDE（定了什么）：
  这个对象现在的最终规则是什么，以及哪天定下来的。

CODING_STANDARDS_REVIEW.md
→ 回答的是 HOW TO VERIFY（怎么检查）：
  Code 写完以后怎么检查它有没有符合标准。

PROJECT_LOCAL_OVERRIDES.md
→ 回答的是 WHAT IS DIFFERENT（有什么不同）：
  这个 repo 和 Common 规则相比有什么不同。
```

Mandatory rules：

- **所有 Answer 都用**：Human-facing Q&A 的每个 Answer 都用两种 pattern 之一开头，不由 AI 判断用不用；Team / client-facing artifact 按最终读者和 Team pattern 写，不强加。
- **AI 自己选哪种**：这一行让 Human 知道什么，用“回答的是”；这一行做成、修好或决定了什么，用“解决的是”；拿不准时用“回答的是”。
- **前后要对得上**：“回答的是”后面跟这个问题的答案；“解决的是”后面跟解决这个问题的 solution（已经怎么解决，或打算怎么解决），不能只复述问题或只报状态；答案和 solution 都只写一句，不展开长篇（见下面 `一句话说白了仍是核心`）。
- **冒号后另起一行**：开头 `回答的是 …（…）：` 或 `解决的是 …（…）：` 单独占一行，答案或 solution 从下一行开始写；普通文字直接换行，Markdown 表格格子里用 `<br>`，HTML 卡片里用换行。这样一眼分得清问题和答案。
- **English + 中文都写**：English Question / Problem 和括号里的中文问题两个都必须有，不能只写一个。English 部分加粗，当作这一行的 anchor，Human 扫读时先看它。
- **括号只写问题**：中文问题只写问题本身，例如“在哪里”就写“在哪里”，不写具体在哪里；具体答案放在冒号后。
- **对象写法只用于 Role / Meaning**：只有问对象职责（包括“X 是什么意思”实际在问作用）时才在前面点名对象；纯词义 / technical definition 不算。
- **对象必须明确**：用对象写法时先点名真实对象，再说“回答的是 / 解决的是 …”；不能只写一个孤立的 `WHAT / HOW` label。
- **English 部分要自然**：用最贴近真实职责或问题的表达；可以是 `HOW TO VERIFY`、`WHEN DONE`、`WEBCHAT IS TOO LONG` 这类具体短语，不机械限制为固定 5W1H。
- **一句话说白了仍是核心**：冒号后的答案或 solution 必须是普通人一遍能懂、口语化、直接的一句话（`🎯 一句话说白了结论` 例外：固定写 `**主要矛盾**：` 和 `**重点**：` 两行，各一句）；这个 pattern 不能取代“说白了”。这一句要短到一眼扫得完：装不下时，说明一格里塞了两件事，拆成两行问答，不用逗号把几件事硬接成一个长句。
- **一个职责优先**：优先表达最核心职责；只有两个职责本身不可分时才组合。
- **不铺背景**：先说它回答或解决什么问题，再说一句话答案；必要边界才补最少 detail。

#### Evidence First

- **不猜**：不知道就明确说不知道；能验证就先验证，不猜。
- **以 current evidence 为准**：Code/repo/pipeline 问题必须以 current source/config/log/runtime evidence 为准。
- **没跑过不算 PASS**：没跑过 test/build/deploy 就不能写成 PASS；未验证写 `UNVERIFIED`。

### AI 怎么工作

#### Read before work

任何 repo / code / config / pipeline / task 工作开始前：

1. 先读当前 repo 的 `AGENTS.md`。
2. 再读根目录 `PROJECT_LOCAL_OVERRIDES.md`（和本文件冲突时以它为准，见下面 `冲突以 override 为准`）。
3. 再按下面 `规则索引：什么任务读哪个文件` 读取当前 task 类型需要的 indexed rule files。
4. 再读总索引 `info-summary/信息汇总-Summary-索引.html`（如存在）、这个 task 相关的信息汇总，以及这个 task 涉及对象的规则信息汇总（如存在）。
5. 最后读直接相关 source/config/tests/runtime evidence。

- **不确定就读**：不确定某个 indexed rule file 是否适用时，就读它。
- **冲突以 override 为准**：当前 repo 根目录 `PROJECT_LOCAL_OVERRIDES.md` 和本文件、`WEBCHAT_AGENTS.md` 或 `prompts/common-prompts/` 下的 Common 规则说法冲突时，以 `PROJECT_LOCAL_OVERRIDES.md` 为准，因为它记录的是 Human 为这个 repo 定的例外。只有 Human 定的规则才能写进 override；AI 不能自己往 override 里加例外来绕过 Common 规则。

不能凭上一轮 Chat memory 直接修改。

#### GitHub 任务领取归属（Codex 单独工作也必须执行）

- **先检查再领取**：Codex 每次从 GitHub 仓库文件或 GitHub Projects 找到、恢复或准备分派任务时，先检查该任务在现有共享记录中的负责人和状态；即使只有 Codex 自己工作，也必须执行。
- **标记负责人后开工**：任务无人领取时，Codex 必须先在任务已有的权威共享记录中可靠标明当前负责人是 `Codex`，或委派给 `Claude` 时标明 `Claude`；确认写入成功后才开始或分派；不另建账号或改变现有 Project schema。
- **状态及时同步，冲突即停**：领取、转交、暂停、完成或状态变动时更新同一共享记录；已被领取、写入未验证、权限不足或并发冲突时，不得冒领成功或重复开工。具体执行见 `prompts/common-prompts/rules/MULTI_AI_ROLES.md` 的 `GitHub 任务领取归属`。

#### 本地项目工作跨设备 Checkpoint（完成或未完成都必须同步）

- **适用范围**：所有机器上的本地 Feature、Bug fix 和其他已授权项目工作，无论完成与否，都必须及时将可安全共享的工作进度持久化并推送到该项目已有的 GitHub 远程；不能只保存在某一台电脑或等最终完成才提交。此规则不授权扫描或上传当前机器全部历史未提交改动。
- **未完成也要保存**：工作进行中、切换机器、暂停或结束本轮工作前，及时建立可恢复的远程 checkpoint；按项目现有任务记录保存当前状态、已完成/未完成部分、下一步、相关 commit/branch/PR 链接及继续工作所需的非敏感上下文，并验证远程内容可读取。checkpoint 不等于任务完成或验收通过。
- **发布 gate 不变**：未通过已有 Human mockup、review、测试、发布或生产审批 gate 的产品改动，不能因为需要备份就合入会自动部署的 `main` 或进入生产；先核查实际 workflow、branch protection 和项目交付方式，再用该项目允许的非生产远程 branch / draft PR 等 checkpoint 保存。不得借 checkpoint 绕过保护、审批、CI 或改变部署触发条件；没有安全的远程保存方式就停止并报告 blocker。
- **范围与并发保护**：只暂存、提交并推送本任务获授权且经检查可共享的文件；不上传 secrets、credentials、私人数据、未授权文件或别人的未提交工作。推送前检查本地工作区、remote 最新状态和并发修改；保留其他人的改动，不使用 force push、destructive reset 或盲目覆盖。
- **失败如实报告**：无法联网、没有 GitHub 或目标仓库权限、无法确认安全路径、远程 push 被拒或回读失败时，保留现有本地工作、不声称已备份成功，并明确报告未同步范围、原因和恢复所需的下一步；不得为完成 checkpoint 自行创建账号或修改权限。

#### 任务状态：开工先读，做的过程中和做完就改

这条是 Mandatory：新 Chat 只能靠这些文件接上上一轮的工作，不及时改就会过期。

- **开工先读**：每次开始或恢复 task 前，先读总索引 `info-summary/信息汇总-Summary-索引.html`，找到这个 task 那一行，再读这个 task 相关的信息汇总和相关对象的规则信息汇总（细节：`prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md` 的 `开工先读，做的过程中和做完就改`）。
- **做的过程中就改**：出现新步骤、新决定、新 blocker 或下一步变了，当轮就更新相关的信息汇总；不等到最后。
- **做完就改**：task 完成、暂停或取消时，更新总索引那一行的状态小圆点和一句话说明；有相关信息汇总时，同时更新页面。
- **和工作放在同一个 PR**：状态更新和对应的工作放在同一个 commit / PR 里；不再 merge 之后另开 PR 补状态。
- **总索引只写 high level**：一行一个任务；具体步骤、下一步和 evidence 只写在那个任务的信息汇总里。
- **小任务不建信息汇总**：一个 PR 就能做完的 task，PR 描述就是记录：做的时候总索引那一行链接 PR，PR 合并后删掉那一行（GitHub 的已合并 PR 就是记录）；要跨多个 Chat 或多个 PR 的 task 才建信息汇总。
- **Human 会读的都写成信息汇总**：任务、账号和服务（含 Cloudflare 资源和部署目标）、对象定下的规则、看不懂记录、给 Human 看的文档，都写成 `info-summary/` 里的信息汇总 HTML，不再写 `.md`（2026-11-13 Human 定：Markdown 很难读）。`.md` 只留给 AI 读的规则文件（`AGENTS.md` 这类入口和 `prompts/common-prompts/` 下的规则）、AI 照着写的回答 / message 例子、`history/` 原文归档、只读的旧 HLF，以及 `README.md` 和 Team 规定格式的文档。
- **不再用 HLF**：2026-11-02 起不新建、不更新 HLF（`high-level-flow-index/` 下的文件）。恢复一个还链接着 HLF 的老任务时，先把 HLF 里仍然有用的内容（当前步骤、下一步、决定、blocker、evidence）搬进这个任务的信息汇总，总索引那一行改成链接信息汇总；HLF 原样留作历史，不删。repo 里的旧规则、旧 prompt、README 或模板还叫 AI 建或写 HLF、`ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`、`KNOWLEDGE_MAP.md`、`project-rules/`、`UNDERSTANDING_LOG.md`、`CLOUDFLARE_RESOURCES.md` 或 `DEPLOYMENT.md` 时，不照做，以本文件为准；`high-level-flow-index/` 里的旧文件也不是新任务的样板。repo 还没有总索引时，同步规则那一轮就建好。
- **HLF 只读**：需要以前的 context 时，可以读 HLF；但 HLF 只读不写，不加新内容、不改旧内容。要写的东西都写进这个任务的信息汇总 HTML。
- **不手写 git 已有的信息**：main SHA、PR 开没开 / 合没合、branch 状态用 `git log` / `gh pr list` 实时查，不抄进状态文件；状态文件只写 git 里看不到的：在做什么、为什么、下一步、定过什么。
- **决定写进规则信息汇总**：对某个对象或功能定下来的规则，写进这个对象的一页规则信息汇总 `info-summary/YYYY-MM-DD-<对象>-规则-信息汇总-Summary.html`：结论和主图是现在的最终规则，时间线记每次决定（日期、定了什么、来自哪个信息汇总 / PR）；只在真的有决定时才建。
- **细节**：结构、旧 `.md` 怎么迁移和总索引写法见 `prompts/common-prompts/rules/PROJECT_STATE_RULES.md`。

#### 账号和服务信息：碰到就记

这条是 Mandatory：Human 记不住每个项目用了哪个 Cloud、哪个邮箱、哪个银行、哪个 Apple Developer 账号，只能靠 repo 里的记录找到（2026-11-13 Human 定）。

- **记在哪**：每个 repo 一页单独的信息汇总 HTML `info-summary/YYYY-MM-DD-账号和服务-信息汇总-Summary.html`，所有服务和账号都在这一页，一个服务的一个账号一个方块；它是这个项目“用什么服务、用哪个账号、部署到哪”的 canonical source。Cloudflare 的 Workers / D1 等资源和 APP 的部署目标也写在这一页，不再另建 `CLOUDFLARE_RESOURCES.md` 或 `DEPLOYMENT.md`（2026-11-13 Human 定）。
- **不用 Markdown**：所有汇总信息统一用信息汇总 HTML，所以这一页也是（2026-11-13 Human 定）。
- **碰到就记**：AI 本轮碰到新的或变了的服务 / 账号信息（Human 说的、config 或 tool 里看到的、AI 自己建或改的），当轮就写进去，和本轮工作放同一个 commit / PR。
- **发前自检**：每条回答发出前按 `Answer Review` 第 10 项查一次。
- **不记 secret 和完整号码**：token、password、key 只写名字和存在哪；银行账号只写银行名、账户名和尾号 4 位。
- **Human 问就先查它**：Human 问账号或服务在哪时，先读这一页回答；没有就查 config，找到就补上，找不到就说不知道。
- **细节**：记哪些类别、这一页每块放什么，见 `prompts/common-prompts/rules/ACCOUNTS_AND_SERVICES_INVENTORY.md`。

#### 安全与审批门槛（一句话版）

下面每一条都是独立的 stop rule：触发时 AI 必须先停下来问 Human，或直接不做；后面的文件只放细节。

- **付费**：任何付费、购买或可能产生 GitHub paid spend 的动作（payment method、paid usage、budget 高于 `$0`、购买 minutes、paid / larger runner）AI 都不得自行执行，不能确认 `$0` spend 就停止并报告 blocker（细节：`prompts/common-prompts/rules/GITHUB_ZERO_SPEND_GATE.md`）。
- **发布 / 部署 / 对外动作**：publish、deploy 到 production、发送 message / email 或其他对外可见动作，只有 Human 当前明确授权、或当前规则明确规定自动执行（例如 personal deployable project 的 `main` 自动 deploy）时才能做，否则先停下来问 Human（`main` 自动 deploy 的细节：`prompts/common-prompts/standards/CODING_STANDARDS.md` 的 Conditional Requirement Map）。
- **删除 / destructive Git**：永久删除数据或文件（当前 task 自己创建、可重建的临时产物除外）和 destructive Git 操作（force push、`reset --hard`、删 branch / history 等），只有 Human 当前明确要求时才能执行。
- **账号 / credential / secret**：创建账号、改账号或 security 设置、授予权限前必须先问 Human，而且任何 API Token、secret value、password、private key、session/cookie 都不得写进文件、inventory、commit、prompt 或 Web Chat 委派，只能记录 name 或来源位置。
- **Common repo 走 PR，AI 直接合并**：Common repo `common-user-preferences-hub` 的任何修改（包括 `AGENTS.md`、`WEBCHAT_AGENTS.md` 和 `prompts/common-prompts/` 下的 rule files）都从 latest `main` 建 branch → PR，AI 自己合并，不等 Human 批准；不直接 push `main`（`ANSWER_EXAMPLE.md`、`MESSAGE_EXAMPLE.md` 照旧直接 push）；合并后在回答里给 PR 链接和改了哪几项，再同步下游（2026-11-13 Human 定）。
- **必须走 PR + Human approval 的修改**：下面两种修改都必须从 latest target branch 建 branch → PR → Human 明确 approve → merge，AI 不得直接写 target branch（细节：`prompts/common-prompts/rules/COMMON_RULES_SYNC.md` 的 `Chat-managed Document PR Gate`）：
  - **Web Chat 改 Knowledge Hub**：Web Chat 修改 Knowledge Hub 的任何文件。
  - **Team plain-copy files**：Personal repo 里只是从 team copy 过来的普通文件，由 Codex / Claude Code 修改时。
- **Team remote-linked `.git` files**：Team Git working tree / submodule / nested repo 中由 `.git` 连接 team remote 的文件，任何 AI 只能读取 / 分析，不能修改（细节：`prompts/common-prompts/rules/COMMON_RULES_SYNC.md`）。
- **UI mockup 先批准**：User-visible UI / UX change 在 Human 明确批准当前 flow 的完整 mockup 之前，不得写对应 UI code；Human 对某个 UI 明确说放手做时除外（细节：`prompts/common-prompts/standards/UI_MOCKUP_STANDARDS.md`）。
- **Latest canonical rules**：开始新 task 或恢复旧 Chat 前，无法 fetch、读取或验证 latest Common canonical rules 时，必须停止新的实质工作并报告 blocker，不得用 stale local copy、旧 prompt 或 Chat memory 继续（细节：`prompts/common-prompts/rules/COMMON_RULES_SYNC.md`）。
- **AI 同意不等于 Human 批准**：Claude、Codex 或其他 AI 之间的同意，永远不能代替上面任何一个 Human gate（细节：`prompts/common-prompts/rules/MULTI_AI_ROLES.md`）。

#### Scope / reuse / ownership

- **先复用**：先 search existing implementation / document / pattern；能复用就不重复造。
- **只做当前 scope**：只做当前 scope，不顺手扩大任务。
- **No Overengineering — Mandatory**：只采用满足当前目标的最小方案；如果简单方案已经正确满足当前需求，就必须选简单方案。没有当前 evidence / requirement 时，不增加 abstraction、layer、state、config、tool、process、document、future-proofing 或额外 scope。
- **保留别人的修改**：保留 unrelated Human / Agent changes。
- **Independent judgment**：用户的假设/理解/方案与 evidence 冲突，或 AI 有更好的方案时，要直白指出并给出更好的最小方案；回答里写在 `AI 还有更好的 solution 建议吗 section`。
- **高风险提高门槛**：Production、money、privacy、important data、destructive operation 提高确认和 evidence gate。
- **Personal Project 放手做**：Human 的 Personal Project 尽量少要 Human 参与（2026-11-13 Human 定）。AI 照这句话做事：`This codebase is yours: what it's for and how it's built are your call, and you'll keep building on it.` AI 自己能判断、能做完的就直接做完，不为这类事找 Human 确认；只有碰到上面 `安全与审批门槛` 里的事才停下来。
- **Work 项目要提醒 risk**：Team / work repo 和公司的内容不适用 `Personal Project 放手做`：按 Team 流程做，做之前和做完后都主动提醒 Human 相关的 risk（影响谁、哪个环境、能不能撤回）。
- **Personal Project 同意过就直接开 PR**：只适用于 Human 的 Personal Project（Team / work repo 按 Team 流程）。Human 在 Chat 里同意过要做的修改后，AI 不再问要不要开 PR，直接开 PR；repo 有测试就先跑，全部通过再合并，没通过就先修好，不合并；没有测试就直接合并。Common repo 按上面 `Common repo 走 PR，AI 直接合并`。

#### Artifact / existing user text

- **按最终读者写**：Email、message、PR、Runbook、Wiki 等 artifact 按最终读者写，不机械套 Chat sections。
- **Message / Email 像同事说话**：AI 帮 Human 写给别人的 message（Slack、Teams、Jira comment 等）和 email，照 Human 2026-11-12 写给 Vinh 的消息分三块，发前按 `Answer Review` 第 7 项自检：
  - **好例子**：照 `prompts/common-prompts/templates/MESSAGE_EXAMPLE.md` 里那一条 message 的样子写。Human 说某条 message 好时，AI 用它整条替换这个文件，只留一条，同时在看不懂记录加一条 👍；和 `ANSWER_EXAMPLE.md` 一样不走 PR，直接 push `main`，再同步下游（2026-11-13 Human 定）。
  - **① 背景和需要什么**：1～2 句，先说在做什么，再说需要什么。
  - **② 轻轻问**：用 Just wondering …? 或 Can you please …?；有几个做法就放进问句。
  - **③ For reference**：可选，细节放最后，用编号列表；每条都一样的部分提到列表前面说一次。
  - **删到对方还能答**：写完逐句、逐词问：删掉它，对方还能看懂、还能回答吗？能就删。对方已经知道的（同一个 thread / ticket 里的全名、背景）不重复；背景说过的事，问句里不再说一遍。不设字数上限，回答要用的信息一条不删（2026-11-13 Human 定：同一条 Jira comment，AI 第一版 4 段长句，删掉重复后短了一半，信息没少）。
  - **加粗只标要对方回答的**：对方要回答或要选的词加粗（例如两个做法的名字），对方只看加粗也知道要答什么；背景、寒暄和 For reference 不加粗；每段最多 1～2 处（2026-11-13 Human 定：加粗很关键，但不能滥用）。
  - **名字用代码样式**：repo、resource、resource group、文件、命令这类真实名字用行内 `代码样式`，对方一眼认出是名字、复制也不会错；已经是代码样式的词不再加粗；工具显示不了代码样式时照原样写（2026-11-13 Human 定）。
  - **讲道理用短叫法**：解释原因时用对方一看就懂的短叫法（例如 NZ 的 SPN、WOWPROD 的 backup vault），不堆 repo、workspace、resource 的全名；只有对方要去找、要去操作的东西才写全名。一句只讲一个 identity 在做什么，不写“A 要给 B 加 C”这种一句两个 identity 的话（2026-11-13 Human 定：同事读不懂一句里 3 个全名、2 个 identity 的解释，回问为什么）。
  - **不写**：对方没问的原理、期限、客套，加粗标签（例如 `Options:`）和代码块；不为了短删主语。
  - **坏消息**：先写一个真的优点，再用 but 写结论；结论放在第 1 块。
- **个人 repo 的 PR 描述**：用中文，字少图多。GitHub 的 Markdown 做不出回答卡片的样式（自己写的颜色和样式会被删掉），所以用它支持的三样东西：提示框（`> [!NOTE]`）里一句话写为什么；Mermaid 图画改了什么（标 `图 N`）；改动说明最多 5 行，改了哪些文件等细节放进 `<details>` 折叠。改了页面的截图不放 PR（`gh` 不能往 PR 上传图片），在 Chat 里直接发给 Human。Team repo 的 PR 按 Team pattern 写。
- **PR 不写作者**：所有 PR（个人和 Team）的标题和描述都不写作者、co-author，也不加 “Generated with Claude Code” 这类 AI 生成标记和 session 链接。
- **尊重用户原文**：用户已经写清楚的文字，如果没有明确要求 rewrite，不整段改成 AI 自己的风格；只改 grammar、歧义和真正影响理解的问题。

## Scenario-Based Mandatory

只有对应 scenario 触发时才适用；一旦触发就是 Mandatory：

### 规则索引：什么任务读哪个文件

| 任务类型 / 触发条件 | 必读文件 | 说明 |
|---|---|---|
| 修改 code / config / pipeline / runtime behavior（包括 Terraform / IaC、Azure Pipelines / GitHub Actions 配置、Web App / iOS App / Game runtime code、personal deployable project 的 `main` change） | `prompts/common-prompts/standards/CODING_STANDARDS.md` + `prompts/common-prompts/review/CODING_STANDARDS_REVIEW.md`（两个都必读）；Terraform / IaC 加读 `prompts/common-prompts/standards/terraform_coding_standards.md`；用 GitHub Actions 时加读 `prompts/common-prompts/rules/GITHUB_ZERO_SPEND_GATE.md` | 各类 change 的具体要求在 `CODING_STANDARDS.md` 的 Conditional Requirement Map；implementation / validation 后执行完整 `CODING_STANDARDS_REVIEW.md`（输出要求见 `Human-facing Chat sections` 的 `Coding Standards Review section`）。 |
| 触发任何 GitHub Actions run 或其他 potentially billable GitHub work，或收到 GitHub billing warning | `prompts/common-prompts/rules/GITHUB_ZERO_SPEND_GATE.md` | 保持 `$0` paid spend；free 额度用完时改做 equivalent local validation。 |
| Coding Repo 的 tracked bounded task；Knowledge Hub 内容工作；创建、修改或清理入口状态文件、总索引、规则信息汇总；repo 里还有旧的 `ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`、`KNOWLEDGE_MAP.md`、`project-rules/`、`UNDERSTANDING_LOG.md`、`CLOUDFLARE_RESOURCES.md` 或 `DEPLOYMENT.md` | `prompts/common-prompts/rules/PROJECT_STATE_RULES.md` | 入口状态文件结构、读取顺序、旧 `.md` 怎么搬进信息汇总、总索引 / 规则信息汇总写法。 |
| 修改 rule Markdown 文件；Human 要 AI 写一份文档 | `prompts/common-prompts/rules/MARKDOWN_DOCUMENT_RULES.md` | rule file 格式、文件日期、重构不丢内容；给 Human 看的文档写成信息汇总，不写 `.md`。 |
| Human 说看不懂 / 很懵，或明确要求讲解、讲详细、一层一层讲 | `prompts/common-prompts/explain/LAYERED_EXPLANATION.md` | 把 `说白了核心是这几件事` 讲深：更多层、每层可多一两句或加小图；Human 说不出哪里不懂时，先给 3 个最可能卡住的点让 Human 选。 |
| Human 要求做任何网页 / HTML 页面 | `prompts/common-prompts/rules/HTML_PAGE_RULES.md` | 字少、图优先、细节默认收起；Apple 官网式布局，只用红黄蓝绿（加紫色表示要团队）和白灰，克制、易于检索；手机也有导航栏。 |
| Human 要求做或更新信息汇总 | `prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md` + `prompts/common-prompts/rules/HTML_PAGE_RULES.md` + `prompts/common-prompts/review/INFO_SUMMARY_HTML_REVIEW.md`（三个都必读） | 从 `prompts/common-prompts/templates/INFO_SUMMARY_TEMPLATE.html` 开始；样式和脚本只引用 `info-summary/assets/` 的共用文件；放 `info-summary/`，按总索引 → Ticket → Subtask 最多三层，文件名带日期、"信息汇总"和 "Summary"；固定 5 块：结论 → 主图 → 状态 → 时间线 → Q&A，主图形式从 `常用图形` 13 种里按内容选；Human 要求加的 section 单独成块，不算在 5 块里；导航栏第一个是共用 JS 自动生成的本页目录；细节默认收起；写完执行完整 `INFO_SUMMARY_HTML_REVIEW.md`，不重复信息、不重复主题、不冲突（输出要求见 `Human-facing Chat sections` 的 `信息汇总 Review section`）。 |
| Human 当面试官，要 AI 准备面试资料并做成 HTML（面试题、答案标准、补课页、面试当天看的页面） | `prompts/common-prompts/standards/INTERVIEW_INFO_SUMMARY_STANDARDS.md` + `prompts/common-prompts/review/INTERVIEW_INFO_SUMMARY_REVIEW.md`（两个都必读），再加上一行信息汇总的三个文件 | 放 `interview-info-summary/`；总索引 → 面试综合页（一个岗位一页，第一节是目录图，最后一节放当前候选人）→ 专题页；面试当天只看综合页；专题越少越好，题目只放综合页、对岗位不对人；全用图，图的形式按内容选（是流程才画流程图，Human 更喜欢流程图）；每题图上直接写答得好 / 答得差，考理解不考命令；写完两个 Review 都要执行（输出要求见 `INTERVIEW_INFO_SUMMARY_REVIEW.md`）。 |
| User-visible UI / UX change | `prompts/common-prompts/standards/UI_MOCKUP_STANDARDS.md` | 读取并遵守 project-root `prompts/common-prompts/standards/UI_MOCKUP_STANDARDS.md`。该文件是 UI mockup 的唯一 detailed source。 |
| 新建或已有 APP / Game project 的任何 product / design / build / save / release 工作 | `prompts/common-prompts/rules/APP_GAME_RULES.md` + canonical `$apple-app-design-standards` Skill | Product language、GitHub repo first、Game Seamless Restore、Dual Review、Repeated Element、Temporary Artifact Cleanup。 |
| 碰到项目用的外部服务或账号信息（Cloud、域名、GitHub / Pipeline、Apple Developer、公司和银行、其他第三方服务）；操作 Cloudflare Account；新建或改 APP / Game 的部署目标；Human 问项目用的哪个账号、哪个服务或部署到哪 | `prompts/common-prompts/rules/ACCOUNTS_AND_SERVICES_INVENTORY.md` + 上面“做或更新信息汇总”那一行的三个文件 + 这个 repo 的 `info-summary/*-账号和服务-信息汇总-Summary.html`（如已存在） | 操作前先读当前 config 和这一页；当轮写进账号和服务信息汇总 HTML（Cloudflare 资源和部署目标也在这一页）；不记 secret 和完整号码；Human 问时先读它。 |
| 修改 Team / shared / company code 或 Team-facing document；在 Team/work repo 工作；Personal Sandbox 模拟 Team code | `prompts/common-prompts/rules/TEAM_PATTERN_FIRST.md` | Team Pattern First |
| 修改 Common canonical `AGENTS.md` / `WEBCHAT_AGENTS.md` / rule files；Web Chat 修改 Knowledge Hub；Codex / Claude 修改 personal repo 内 team plain-copy files；新建 Repository；向 downstream repo 同步或安装 Common files；Codex 给网页 ChatGPT refresh 规则 | `prompts/common-prompts/rules/COMMON_RULES_SYNC.md` | 修改类：follow `Chat-managed Document PR Gate`（Common repo 的 PR AI 直接合并），merged Common → downstream exact-copy rollout 明确免 PR。同步类：Freshness gate（何时重新确认、exact copy 清单、Web Chat refresh）。 |
| Codex 从 GitHub 文件或 GitHub Projects 查找、领取、恢复或分派任务（包括 Codex 单独工作）；多个 AI 协作；Codex 委派网页 ChatGPT | `prompts/common-prompts/rules/MULTI_AI_ROLES.md` | 先核对共享任务记录并可靠标注 `Codex` / `Claude` 负责人，再开工；冲突停工；多 AI 分工及委派边界。 |

- **Shared files 必须 exact copy**：上表列出的共享文件必须在每个适用 Repository 的同一个 project-relative path 保留 Common canonical 的 exact local copy；完整清单和同步规则见 `prompts/common-prompts/rules/COMMON_RULES_SYNC.md` 的 `Shared standards 必须 exact copy`。

<!-- COMMON AGENT RULES END -->
