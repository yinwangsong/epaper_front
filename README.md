# E-Paper

### 软件定位：

* 应用场景：

  > 中国各高校本科生与研究生在初涉学术论文写作的领域时，存在着一些反复出现的问题。如何写出在语言上达标的毕业论文，提高审阅通过的概率，成为本科生的一大难题。不仅如此，对于想在学术期刊上发表自己科研成果的研究生来说，也同样面临着这样的问题。他们的毕业论文中往往存在着许多的打字错误、词汇使用不当、句式结构错误以及口语化表达。这类缺陷是学术论文的硬伤，削弱了论文的专业性与严谨性，也直接影响着审阅者对于学术论文总体水平的评估。所以，这些缺乏经验的论文写作者往往会耗费大量时间与精力解决毕业论文中语言方面的错误。有些学生会求助于他们的导师，但大量的论文以及频繁出现的语言上的低级错误往往会让导师们烦不胜烦。
  >
  > 如何快速指出并纠正此类学术论文的语言表达上的问题，让导师与学生能够将注意力放在学术论文本身，成为了一大痛点。

* 目标人群：

  > 本项目的目标人群是中国各高校的本科生、研究生以及他们的导师。
  >
  > 对于学生来说，他们在学术论文的写作这个领域存在着经验不足的情况，在论文写作中往往出现打字错误、词语表达错误、句子结构混乱、句子表达不规范的问题。他们也急切的需要一种较为客观的、全面的评价来衡量他们的学术论文的文章质量，以此来引导他们在学术论文上的写作。另一方面，对于“学生党”而言，他们难以支付高昂的人工服务费来修改、润色文章。
  >
  > 对于导师而言，他们长期大量审阅学生写作的学术论文，学术论文中的语言硬伤往往让他们感到不适，而他们并没有时间与精力仔细查找并指出这类基础错误。同时，这也导致导师难以直接确定学术论文的写作档次，甚至影响到导师对于学术论文本身的理解与判断，使得他们难以将注意力集中到论文本身上。

### 软件基本功能：

> 该项目的软件产品的客户端功能主要分为三大类：启发模式、评价模式与进步情况。下面将对这三个模式及其子功能进行介绍。
>
> 该项目软件产品的启发模式含有一个单向流程，而一个流程有三个步骤。每个步骤下，客户端将使用不同的方法扫描并标记出用户提交的学术论文中出现的各种问题，然后客户端辅助用户发现、修改该阶段学术论文中的特定问题。
>
> 与启发模式三个阶段相对应的三个主要子功能为：对用户的输入的中文学术论文文本进行打字错误检测与修正、句子通顺程度的检测与提示、句子口语化问题与情感偏差的检测与指导方案的生成。
>
> 打字错误的检测与修正是自然语言处理模型结合上下文对用户输入的中文学术论文文本中的一些错字、别字与偶尔的打字错误（如与输入法有关的拼音相近或笔画相近的输入错误）的检测，并在这些地方做出标记，而后，自然语言处理模型通过语境分析，将找出最适合当前语境的字或词，并结合模型提示并给出修改建议，用户可以根据自己的需要决定是否接受系统给出的修改建议。
>
> 句子通顺程度与提示是在句子进行分词处理后，通过神经网络模型，以词与词之间的搭配是否符合惯用表达为标准，对分词结果进行扫描检测，找到论文中搭配不符合惯用表达的部分并在对应的地方做出标记来提示用户进行修改。然后，将使用自然语言处理模型的中文分词LAC技术对于分词结果进行词性与成分的分析，结合团队创新性启发式算法对句子成分残缺进行逐句检测，找到问题句子后将进行错误分类，将问题句子进行归类。最后，软件产品将对问题句子做标记并提示用户句子的问题所在，以此来引导用户进行修改。
>
> 句子口语化问题与严谨性问题的检测与指导方案的生成是通过自然语言处理模型的文本分类应用模型，逐句对学术论文中的句子进行文本分类操作，找出口语化成分过多的句子，并做出标记提示用户进行修改。而后，软件产品将对经过初步处理后的句子进行逐一扫描，来剥离文本中不符合学术论文一般表达习惯的句子，通过自然处理预训练模型中的机器翻译应用模型、结合语境语义、按照优秀论文的标准，将这些不严谨的句子翻译成符合学术论文表达规范且较为严谨的句子，并在此基础上生成指导方案。软件产品将对不严谨的句子做出标记，并将指导方案呈现给用户，这样可以大大提升学术论文的整体严谨度。
>
> 本产品的评价模式可以针对论文给出综合加权分数的功能，用户将通过客户端引导来进入评价模式获取分数。
>
> 

### 运行软件的方法：

* 安装环境：

  > 客户端的正常运行环境为已连接到互联网的安卓系统中，要求系统能够支持与运行快应用，而对于系统的版本要求为Android 5.0及以上。另外，客户端对硬件环境无特殊要求，对于硬件的性能也无特殊要求。
  >
  > 服务端的运行环境为安装Debian 9操作系统（一种Linux发行版）的高性能云服务器，要求服务端运行内存至少为32G，CPU核心个数要求为2个及以上，CPU核心频率要求为2.4GHz及以上。根据自然语言处理模型的需要要求服务器搭载一个或者多个高性能GPU，而对于每个GPU显存的最低要求为12G。为保证用户体验服务器带宽应为5M及以上，并具备有较低延迟的特性。


### 使用说明：

> 用户初次使用本软件时，系统会为用户提供指示说明，一步一步带领用户如何操作、使用本软件。用户可以在首页输入需要修改的文章/文段，输入方式有在文本框中输入文字和导入word文档两类方式，输入完成之后点击提交。用户输入的文字就被传送到服务端进行处理，并在“我的”页面展示文档处理状态：正在处理/已处理完。当文档处理完之后会通过快应用卡片的形式通知用户可以查看。用户点击需要查看的文档之后，可以选择进入修正模式还是启发模式。其中进入修正模式，会将修改之后完整的文章展现在屏幕上，用户可以根据需要导出或连接蓝牙打印机打印文章。若进入启发模式，本产品会将文章中每个句子的错误/不足之处用高亮标出，其中红色高亮为错别字，黄色高亮为句子情绪过于消极/积极，绿色高亮为句子不通顺。用户可以点击每个句子查看各个句子的修改建议，已完成论文的局部修改。
>
> 除此之外，用户还可以在首页查看个人的进步状态，其中包括了用户自使用本产品以来，每篇文章的评分曲线图以及每篇文章的错误饼状图，以帮助用户结合自身情况更好的书写文章和发展进步。

### 代码目录结构说明：

```
###########目录结构描述
├─assert
│  └─image
├─cards
├─Common
├─Components
├─Home
├─Improvement
├─Inspire_result
├─Mypage
├─styles
├─tab_bar
├─User_login
├─utils
├─README.md
└─Value_result
```

### 常见问题说明：

暂无

