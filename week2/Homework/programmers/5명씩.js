function solution(names) {
    var answer = [];
    answer = names.filter((_, index) => index % 5 === 0);
    return answer;
}