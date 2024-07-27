import type { ComponentType, ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

export const SubNavigation = styled.div`
    ${tw`flex flex-row items-center flex-shrink-0 h-12 mb-4 border-b border-neutral-700`};

    & > a {
        ${tw`flex flex-row items-center h-full px-4 border-b text-neutral-300 text-base whitespace-nowrap border-transparent`};

        & > svg {
            ${tw`w-6 h-6 mr-2`};
        }

        &:active,
        &.active {
            ${tw`text-zinc-300 border-zinc-300`};
        }
    }
`;

interface Props {
    to: string;
    name: string;
    viewTransition?: boolean;
}

interface PropsWithIcon extends Props {
    icon: ComponentType;
    children?: never;
}

interface PropsWithoutIcon extends Props {
    icon?: never;
    children: ReactNode;
}

export const SubNavigationLink = ({
    to,
    name,
    icon: IconComponent,
    children,
    viewTransition,
}: PropsWithIcon | PropsWithoutIcon) => {
    const navigate = useNavigate();

    if (!viewTransition) {
        return (
            <NavLink to={to} end>
                {IconComponent ? <IconComponent /> : children}
                {name}
            </NavLink>
        );
    }

    return (
        <a
            onClick={e => {
                e.preventDefault();

                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        flushSync(() => {
                            navigate(to);
                        });
                    });
                } else {
                    navigate(to);
                }
            }}
        >
            {IconComponent ? <IconComponent /> : children}
            {name}
        </a>
    );
};
