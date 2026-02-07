import styled from 'styled-components';
import { primaryColor } from '../../utils/colors';

const StyledButton = styled.button`
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid gray;
    background-color: ${primaryColor};
    color: white;
    cursor: pointer;
    
    &:disabled {
        opacity: 0.3;
    }
`;

function Button({ label, onClick, isDisabled }) {
    return (
        <StyledButton onClick={onClick} disabled={isDisabled}>{label}</StyledButton>
    );
}

export default Button;