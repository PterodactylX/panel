import tw, { styled } from 'twin.macro';

import { withSubComponents } from '@/components/helpers';

const Wrapper = styled.div`
    ${tw`w-full flex flex-col px-4`};

    & > a {
        ${tw`h-10 w-full flex flex-row items-center text-primary cursor-pointer select-none px-4 my-1`};
        ${tw`transition-colors duration-150 ease-in rounded-sm`};

        & > svg {
            ${tw`h-6 w-6 flex flex-shrink-0`};
        }

        & > span {
            ${tw`font-header font-medium text-lg whitespace-nowrap leading-none ml-3`};
        }

        &:hover,
        &:active,
        &.active {
            ${tw`text-primary-foreground bg-primary`};
        }
    }
`;

const Section = styled.div`
    ${tw`h-[18px] font-header font-medium text-xs text-primary whitespace-nowrap uppercase ml-4 mb-1 select-none`};

    &:not(:first-of-type) {
        ${tw`mt-4`};
    }
`;

const User = styled.div`
    ${tw`h-16 w-full flex items-center justify-center`};
`;

const Sidebar = styled.div`
    ${tw`h-screen hidden md:flex flex-col items-center flex-shrink-0 overflow-x-hidden ease-linear`};
    ${tw`transition-[width] duration-150 ease-in`};
    ${tw`w-[17.5rem]`};

    & > a {
        ${tw`h-10 w-full flex flex-row items-center text-primary cursor-pointer select-none px-8`};
        ${tw`hover:text-neutral-50`};

        & > svg {
            ${tw`transition-none h-6 w-6 flex flex-shrink-0`};
        }

        & > span {
            ${tw`font-header font-medium text-lg whitespace-nowrap leading-none ml-3`};
        }
    }
`;

export default withSubComponents(Sidebar, { Section, Wrapper, User });
