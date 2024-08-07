import startTransition from '@/lib/transition';
import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

export const SubNavigation = styled.div`
    ${tw`flex flex-row items-center flex-shrink-0 h-16 mb-4 dark:border-slate-800 border-slate-200 border p-2 rounded-lg gap-2 overflow-x-auto max-w-[calc(100vw-3rem)]`};
    scrollbar-width: thin;
    scrollbar-color: theme('colors.primary');
    scroll-behavior: smooth;

    & > a {
        ${tw`flex flex-row items-center h-full px-4 text-primary text-base whitespace-nowrap border-transparent`};

        & > svg {
            ${tw`w-6 h-6 mr-2`};
        }

        &:active,
        &.active {
            ${tw`bg-primary border-primary border-b text-primary-foreground`};
        }

        &:hover {
            ${tw`cursor-pointer`};
        }

        &,
        a {
            ${tw`rounded-lg transition-colors duration-150 ease-in`};
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
    const location = useLocation();
    const [className, setClassName] = useState<string>('');

    if (!viewTransition) {
        return (
            <NavLink to={to} end>
                {IconComponent ? <IconComponent /> : children}
                {name}
            </NavLink>
        );
    }

    useEffect(() => {
        if (location.pathname.endsWith(to)) {
            setClassName('active');
        } else {
            setClassName('');
        }
    }, [location.pathname]);

    return (
        <a
            onClick={e => {
                e.preventDefault();

                startTransition(() => navigate(to));
            }}
            className={className}
        >
            {IconComponent ? <IconComponent /> : children}
            {name}
        </a>
    );
};
