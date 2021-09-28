import styled from 'styled-components'

export const StyledButton = styled.button.attrs(props => ({
    size: props.size || "1rem",
}))`

        background-color: rgb(223, 227, 232);
        font-weight: 700;
        font-size: ${props => props.size};
        border-radius: 8px;
        box-shadow: rgb(0 0 0 / 24%) 0px 8px 16px 0px;
        border: none;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: rgb(33, 43, 54);
        cursor: pointer;
        padding: .5rem 1rem;

        &:hover {
            background-color: rgb(196, 205, 213);
        }

        & .active{
            background-color: red;
        }

        ${props => props.primary &&`
            background-color: rgb(255, 48, 48);
            color: #fff;

            &:hover {
                background-color: rgb(183, 24, 51);
            }
        `};

        ${props => props.secondary &&`
            background-color: rgb(51, 102, 255);
        `};
    `
