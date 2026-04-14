function solution(num_list) {
    return num_list.length >= 11
        ? num_list.reduce((sum, num) => sum + num, 0)
        : num_list.reduce((mul, num) => mul * num, 1)
}