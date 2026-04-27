// Search.jsx

/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';

const searchContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const buttonStyle = (theme) => css`
  width: 5rem;
  border-radius: ${theme.radius.md};
  border: none;
  padding: 0.5rem 1rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;
	transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primaryHover};  
  }
`;

const inputStyle = (theme) => css`
  width: min(40rem, calc(100vw - 2rem));
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border};
  padding: 0.5rem 1rem;
  font-size: ${theme.fonts.sm};
`;

const Search = ({ search, onSearchChange, onSearchClick }) => {
    const theme = useTheme();

    return (
        <div css={searchContainerStyle}>
            <input
                type='text'
                value={search}
                onChange={onSearchChange}
                placeholder='검색어를 입력하세요'
                css={inputStyle(theme)}
            />
            <button css={buttonStyle(theme)} onClick={onSearchClick}>
                검색
            </button>
        </div>
    );
};

export default Search;
