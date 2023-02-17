export const mediaDown = (breakpoint: number) => `@media (max-width: ${breakpoint}px)`;

export const mediaUp = (breakpoint: number) => `@media (min-width: ${breakpoint}px)`;

export const size = (px: number) => `${px / 16}rem`;
