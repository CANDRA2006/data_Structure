## Program Description: Data Search

This program is designed to compare the performance of two data search methods, namely Sentinel Linear Search and Index Sequential Search, in locating fruit names within a CSV-formatted dataset. The dataset is read using the File System module in a Node.js environment, then processed by extracting the first column as the main data and normalizing it to lowercase to maintain search consistency. Once loaded, the dataset is sorted alphabetically as a prerequisite for implementing the Index Sequential Search method.

The Sentinel Linear Search method works by placing the target value as a temporary last element in the dataset, allowing the search process to proceed without checking the index bounds at each iteration. This approach aims to reduce the number of loop operations and improve linear search efficiency. Meanwhile, Index Sequential Search divides the dataset into several blocks of a certain size and builds an index table to narrow down the search space, so that the search is only conducted within the block likely to contain the target data.

Additionally, the program measures the performance of each algorithm based on the number of search steps and execution time using a high-resolution timer. Users can input multiple search targets simultaneously, and the search results are presented in a comparative table showing search success, data index positions, number of steps, and execution time.

In this way, the program provides an empirical overview of the relative efficiency of both search algorithms on large datasets.

## Installation
```
git clone <repository-url>
cd <project-folder>
npm install
```
