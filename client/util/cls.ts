//tailwind 클래스 네임 합치기 위한 함수
export const cls = (...classnames: string[]) => {
    return classnames.join(" ");
};