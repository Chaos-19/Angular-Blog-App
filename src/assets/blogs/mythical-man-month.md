---
pubDatetime: 2023-04-09
title: Lessons from The Mythical Man-Month
slug: mythical-man-month
tags:
  - computerscience
description: Learn from Fred Brooks' classic on software project management, productivity, and team dynamics. Boost your skills with key takeaways for maximum efficiency
---

There are some important books that every developer should read, such as The Mythical Man-Month, Pragmatic Programmer, Clean Code, etc. However, developers may sometimes feel lazy when it comes to reading.
To help with that, I have prepared key takeaways for some chapters in The Mythical Man-Month. Not all chapters will have key takeaways, as the book is relatively old and some topics may be outdated.
Nonetheless, I have done my best to summarize the relevant information.

## Chapter 1. Tar Pit

- Programming is a fulfilling activity that requires creativity, as well as tackling non-repetitive tasks. The joy of making useful tools for others is one of the many benefits of programming.

- However, it can also be challenging to get programming right, as achieving perfection is much harder than it may seem.

## Chapter 2. The Mythical Man-Month:

- It is incredibly critical to write things down before beginning any implementation because it allows us to identify problems before they arise. Since our work is primarily thought-based, if we can get everything right in the planning stage, there will be fewer difficulties in the execution stage. Therefore, it is essential to write first to identify errors before they manifest.

- As developers, we tend to be overly optimistic about our ability to deliver on time. However, unforeseen problems can arise during the development process, and it is essential to be realistic about potential delays.

- Adding more people to a team does not always result in increased productivity. The reason is that someone still has to spend time onboarding and teaching new team members the project's conventions and practices. In fact, adding a person during periods of low manpower can actually decrease productivity since you now have the same output as before, minus one, until the newly recruited member picks up the workload.

## Chapter 3. Surgical Team

- To achieve better results, it is essential to have individuals who excel in their respective fields rather than coordinating a group of average individuals.

- A small, focused team of ten individuals working together on a specific program, feature, or bug can enhance the development process while saving time and resources.
  This approach ensures that everyone is on the same page and working towards a common goal as a cohesive unit.
  While each team member has their own area of expertise, clear goals are set, enabling everyone to take initiative and complete their work independently, without the need for constant consultation with upper management.

- Small teams can be slower when working on large-scale systems.

## Chapter 4. Aristocracy, Democracy, and System Design

- To achieve "Conceptual Integrity", it is crucial to ensure that the team is on the same page. This can be achieved by using the same idiomatic conventions in language or techniques to create a framework and reduce the cognitive load.
  It is important to establish a clear process that does not require unnecessary mental processing, so that team members do not have to spend time thinking about what to do next.
  Team members should not worry about where to place their service functions or overthink which utility to use when they need something.
  Consistency and clarity should be maintained throughout the team.

- To achieve conceptual integrity, someone has to take charge and raise the red flag. It is essential to have someone who can control the concepts.

- We don't always need to wait for a detailed plan to get started on something. As soon as we have a general idea of what to do and how to do it, we can kick-start a project.
  This is because things often change during implementation. We may realize that we missed some points during the specification write-up, only becoming aware of them when we start implementing the idea. Therefore, we should not delay starting the implementation.
  If we feel that something is off, we can go back and change the specifications. It is important to keep moving forward in parallel.

## Chapter 5. Second-System Effect

### Interactive Discipline for the Architect

For this key takeaway we need a little bit of context, so here is direct quotation from the book:

_For builder to be successful, the architect must:_

_- Remember that the builder has the inventive and creative responsibility for the implementation; so the architect suggests not dictates_

_- Always be prepared to suggest a way of implementing any thing he specifies, and be prepared to accept any other way that meets the objectives as well;_

_- Deal quietly and privately in such suggestions;_

_- Be ready to forego credit for suggested improvement_

### Take away of Interactive Discipline for the Architect

A common scenario is when a senior or lead developer writes specifications for a solution or implementation. However, since they may not be as involved or have a full comprehension of that part of the system,
the specifications may not reflect the real requirements. In such cases, the implementer or builder steps in to make additional implementations or even rewrites some of them to make everything easier and more understandable. If the changes are really impactful and useful for the project, the senior or lead developer should allow the implementer or builder to keep them.

### Take away of Second-System Effect

When working on a new project or in an unfamiliar domain, it's natural to be cautious and take measures to avoid issues. However, as we gain more knowledge and confidence, we tend to overcomplicate things by adding unnecessary complexity. This results in code that is difficult to maintain and hinders productivity. It's important to keep projects as simple as possible, as simplicity is the ultimate form of sophistication.

## Chapter 6. Passing the Word

- To ensure conceptual integrity, the entire team should hold weekly meetings to discuss the current state of the product and contribute new ideas. It's important for everyone to participate in these meetings to ensure a clear vision of what needs to be done and how to proceed.

- If any of the developers have questions regarding the specs, they should ask the person who wrote the specs to clarify any confusion. Once the confusion has been cleared up, the information should be shared with everyone on the team.

- Testing and the tester are key to a successful product. They are the best instruments to pinpoint issues and identify problems to be passed on to the developer.

## Chapter 7. Why Did the Tower of Babel Fail?

- Projects that lack communication are doomed to fail. Communication is essential.
- Teams in a big system/organization should communicate with each other to spread knowledge through regular project meetings and technical briefings.
- Every project has two leadership roles to be filled: producer and architect. Their roles are different. They can be the same person or each other's right hands, for example, the architect is the boss and the producer is the right hand.

## Chapter 8. Calling The Shot

- Estimating total effort by only accounting coding time is not achievable.

- Using the right tool for the right job can sky rocket programming productivity.

## Chapter 10. The Documentary Hypothesis

- Having clear and detailed documents, notes, and plans is essential for preventing potential issues and sharing knowledge across the team.

- These documents also help reduce the manager's burden by providing clear directions and allowing them to easily identify mistakes and take appropriate action.

- Product Manager has to make sure everybody is heading in the same direction.

## Chapter 11. Plan to Throw One Away

- This chapter centers around the concept of "throwaways," or the idea that we should be prepared to let go of our initial ideas in advance in order to avoid wasting our end users' time. This is because first systems are generally too slow, too large, or have a poor user experience.

However, we should not simply discard the first prototype, or pilot; instead, we should learn from it and redesign the new system with improved ideas. Like any other system, software changes over time, as our end users' perceptions and needs evolve with the program's development, testing, and use.

Each feature introduced into the program to keep up with these changes should be carefully tested.

- _Programmer delivers satifaction of a user need rather than any tangible product._(Cosgrove)

- Organizations often have their own cultures and hierarchies, which can make it challenging to implement new ideas or processes. As a result, it's important to approach change management with sensitivity and a clear understanding of the human factors involved.

- After each test, one must run a regression test to make sure everything works as it is supposed to.

## Chapter 12. Sharp Tools

The manager should allocate resources to develop commonly used packages. This includes developing shared libraries, UI components, code snippets, and other useful tools. Additionally, it's important to recognize that some developers may have their own preferred methods of working. Therefore, their input should be considered and not disregarded.

## Chapter 13. The Whole and the Parts

This chapter explores ways to design software without bugs. One effective method for preventing bugs is to maintain conceptual integrity, as previously discussed. This is because bugs often arise from mismatched assumptions among team members regarding the product.

To prevent bugs, specifications should be crystal clear. Otherwise, developers may invent their own solutions to problems. As Vyssotsky once said, "They won't tell you they don't understand; they will happily invent their way through the gaps and obscurities."

The top-down approach (also known as stepwise design and refinement, and sometimes used synonymously with decomposition) is vital for designing bug-free software. It involves breaking down a problem into smaller tasks, applying a solution to each task, evaluating the results, and determining how far they deviate from the desired outcome. From there, we can break down these results into even smaller steps and develop the rest of the features and programs as modular components. With modular design, we can test individual steps easily, as they are clearly separated and partitioned. Each module contains its own logic, making it easy to avoid system-wide bugs. This does not mean that we will never have to start from scratch if requirements change, but with this approach, we can do so more easily because the system is modularized.

It is highly beneficial to test each part separately with unit tests and appropriate fixtures. In the book, this is referred to as a "dummy component."

When introducing new features, it is best to add programs and functions one at a time rather than batching all changes into a single step. By updating the system with each new feature as it is completed, you can reduce regression. If something goes wrong in the update process, it will be easier to detect.

## Chapter 14. Hatching a Catastrophe

- Estimates should be precise. When they are accurately estimated and fulfilled, they can motivate the team to achieve even more. However, if an estimate is incorrect and the schedule slips, it can have a negative impact on the team's morale.

- The team should always strive to give their best effort to meet expectations, even in the face of unforeseen issues such as missing team members, production system downtime, or planning errors. This is what it means to "hustle," and it can act as a cushion for potential problems.

- A manager should know how to avoid problems by initially assessing and understanding their cause. They should also know when to keep potential issues from their boss to avoid unnecessary complications. Once their team has resolved the issue under their supervision, the manager can then inform their boss and address any lingering concerns.

## Chapter 15. The Other Face

The program should be "self-documenting"; there shouldn't be separate documentation for the code and the users. The code should be easily understandable at first glance and easy to reason about. To achieve this, we must use mnemonic names, avoid branching as much as possible, and occasionally comment if the code is abstract or involves complex regex queries.

## Chapter 15. No Silver Bullet

Software is inherently complex, and it's something we must accept. As the quote goes, "The complexity of software is an essential property, not an accidental one." Therefore, our goal should be to abstract that complexity for the future, for our team members, and for the sake of maintainability of the product.

Conformity is another crucial aspect of software development. Since software has to follow specifications, guidelines, and user needs, it can be challenging to ensure that it adheres to all these rules.

Changeability is yet another aspect of software complexity. Software is constantly evolving to meet the changing needs of its users, and we must be prepared to adapt accordingly.

One of the gifts and curses of software is its invisibility. While it can be difficult to grasp and communicate, we can also easily abstract concepts.

While there have been numerous breakthroughs in the programming world, such as high-level languages, object-oriented programming, and artificial intelligence, there is no silver bullet in the world of computers. As the quote goes, "The hard thing about building software is deciding what to say, not saying it." This means that determining the software's intended functionality and behavior is often more challenging than actually writing the code.

The concept of "Buy versus Build" is a significant breakthrough in software development. To deliver quickly and with minimal hassle, it's often better to buy Software as a Service (SaaS) and Data as a Service (DaaS). This approach allows the provider to maintain the software, reducing the burden on the development team.

Incremental development is also crucial, as perfection cannot be achieved on the first try. By taking an incremental approach to development, we can build a system and add new features gradually, based on the needs and behaviors of the customers and users.

Lastly, having a great designer or architect is a crucial step in preventing issues before they arise.

Overall, software development is complex, but by abstracting complexity, adhering to guidelines and specifications, adapting to change, buying versus building, incremental development, and having a great designer or architect, we can build successful software products.
