import tw, { styled } from 'twin.macro';
import { withSubComponents } from '../helpers';

const Header = styled.div`
    ${tw`flex flex-col flex-shrink`}
    min-width: 0;
`;

const Title = styled.h1`
    ${tw`text-2xl text-primary font-header font-medium`};
`;

const SubTitle = styled.p`
    ${tw`text-base text-neutral-400 whitespace-nowrap overflow-ellipsis overflow-hidden`};
`;

export default withSubComponents(Header, { Title, SubTitle });
