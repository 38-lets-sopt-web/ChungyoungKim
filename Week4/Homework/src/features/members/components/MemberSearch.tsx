import type { CSSObject } from '@emotion/react'

import type { MemberSearchController } from '@/features/members/hooks/useMemberSearch'
import { CtaButton } from '@/shared/components/CtaButton'
import { TextField } from '@/shared/components/TextField'
import { UserInfoCard } from '@/shared/components/UserInfoCard'
import { theme } from '@/shared/styles/theme'
import type { User, UserSummary } from '@/shared/types/user'

type MemberSearchProps = {
  memberSearch: MemberSearchController
}

export function MemberSearch({ memberSearch }: MemberSearchProps) {
  const { state, actions } = memberSearch

  return (
    <main css={pageStyle}>
      <h1 css={pageTitleStyle}>회원 조회</h1>

      <section css={searchSectionStyle} aria-label="회원 ID 조회">
        <form css={searchFormStyle} onSubmit={actions.submitMemberSearch}>
          <TextField
            label="회원 ID"
            name="memberId"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="원하는 ID를 검색해 보세요!"
            value={state.memberId}
            onChange={(event) => actions.changeMemberId(event.target.value)}
          />

          <CtaButton type="submit" disabled={!state.canSearchMember}>
            {state.isSearchingMember ? '검색 중' : '검색'}
          </CtaButton>
        </form>
      </section>

      <section
        css={searchResultSectionStyle}
        aria-labelledby="search-result-title"
      >
        <h2 css={sectionTitleStyle} id="search-result-title">
          검색 결과
        </h2>

        <SearchResult
          errorMessage={state.memberSearchErrorMessage}
          searchedMember={state.searchedMember}
        />
      </section>

      <section css={memberListSectionStyle} aria-labelledby="member-list-title">
        <h2 css={sectionTitleStyle} id="member-list-title">
          전체 멤버 리스트
        </h2>

        <MemberList
          errorMessage={state.memberListErrorMessage}
          isLoading={state.isLoadingMembers}
          members={state.members}
        />
      </section>
    </main>
  )
}

type SearchResultProps = {
  errorMessage: string
  searchedMember: User | null
}

function SearchResult({ errorMessage, searchedMember }: SearchResultProps) {
  if (searchedMember !== null) {
    return <UserInfoCard items={createMemberDetailItems(searchedMember)} />
  }

  if (errorMessage.length > 0) {
    return <p css={resultMessageStyle}>{errorMessage}</p>
  }

  return <p css={resultMessageStyle}>원하는 ID를 검색해 보세요!</p>
}

type MemberListProps = {
  errorMessage: string
  isLoading: boolean
  members: UserSummary[]
}

function MemberList({ errorMessage, isLoading, members }: MemberListProps) {
  if (isLoading) {
    return <p css={listMessageStyle}>회원 리스트를 불러오는 중입니다.</p>
  }

  if (errorMessage.length > 0) {
    return <p css={listMessageStyle}>{errorMessage}</p>
  }

  if (members.length === 0) {
    return <p css={listMessageStyle}>표시할 회원이 없습니다.</p>
  }

  return (
    <ul css={memberGridStyle}>
      {members.map((member) => (
        <li css={memberCardStyle} key={member.id}>
          <strong>{member.name}</strong>
          <span>{member.part}</span>
        </li>
      ))}
    </ul>
  )
}

function createMemberDetailItems(member: User) {
  return [
    { label: '아이디', value: member.loginId },
    { label: '이름', value: member.name },
    { label: '이메일', value: member.email },
    { label: '나이', value: `${member.age}세` },
    { label: '파트', value: member.part },
  ]
}

const pageStyle: CSSObject = {
  width: 'min(100%, 100rem)',
  marginInline: 'auto',
  padding: '5.6rem 2.4rem 6rem',
}

const pageTitleStyle: CSSObject = {
  margin: `0 0 ${theme.spacing.xl}`,
  color: theme.colors.brand,
  fontSize: theme.fontSize.title,
  fontWeight: 900,
  lineHeight: theme.lineHeight.tight,
  textAlign: 'center',
}

const searchSectionStyle: CSSObject = {
  display: 'flex',
  width: `min(100%, ${theme.size.authFormWidth})`,
  flexDirection: 'column',
  gap: theme.spacing.lg,
  margin: `0 auto ${theme.spacing.xxl}`,
}

const searchFormStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}

const searchResultSectionStyle: CSSObject = {
  display: 'flex',
  width: `min(100%, ${theme.size.authFormWidth})`,
  flexDirection: 'column',
  gap: theme.spacing.md,
  margin: `0 auto 6rem`,
}

const resultMessageStyle: CSSObject = {
  display: 'flex',
  minHeight: '14rem',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  border: `${theme.borderWidth.sm} solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  background: theme.colors.surfaceMuted,
  color: theme.colors.textMuted,
  fontSize: theme.fontSize.md,
  fontWeight: 700,
  textAlign: 'center',
}

const memberListSectionStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}

const sectionTitleStyle: CSSObject = {
  margin: 0,
  color: theme.colors.text,
  fontSize: '2rem',
  fontWeight: 900,
}

const memberGridStyle: CSSObject = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
  gap: theme.spacing.lg,
  margin: 0,
  padding: 0,
  listStyle: 'none',
}

const memberCardStyle: CSSObject = {
  display: 'flex',
  minHeight: '7.6rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.sm,
  borderRadius: theme.radius.md,
  background: theme.colors.surface,
  color: theme.colors.brand,
  fontSize: theme.fontSize.md,
  fontWeight: 900,

  span: {
    borderRadius: theme.radius.round,
    background: theme.colors.surfaceMuted,
    color: theme.colors.brand,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: theme.fontSize.sm,
    fontWeight: 700,
  },
}

const listMessageStyle: CSSObject = {
  margin: 0,
  color: theme.colors.textMuted,
  fontSize: theme.fontSize.md,
  fontWeight: 700,
}
