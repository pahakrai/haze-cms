import React from 'react';
import styled from 'styled-components';
import { MdPhone } from 'react-icons/md';
import { FaRegEnvelope } from 'react-icons/fa';
import moment from 'moment';
import UserAvatar from '../../Common/Avatar';

// import DetailStatusbar from './DetailStatusbar';

const Color = '#747575';
const FontSize = '16px';

const Title = styled.p`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
`;
const Wrap = styled.div`
  padding: 15px 15px 15px 20px;
  background-color: #fff;
  margin-bottom: 10px;
`;
const NavWrap = styled.div`
  display: flex;
`;
const NavTitle = styled.div`
  flex: 1;
  margin-left: 15px;
`;
const NavIntroduction = styled.div`
  font-size: ${FontSize};
  color: ${Color};
  padding-bottom: 10px;
`;
const ContactInformation = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FontSize};
  padding-top: 10px;
  color: ${Color};
  & > span {
    margin-left: 10px;
  }
`;
const School = styled.span`
  padding-right: 10px;
  border-right: 1px solid ${Color};
  font-size: ${FontSize};
  color: ${Color};
`;
const Subject = styled.span`
  padding-left: 10px;
  font-size: ${FontSize};
  color: ${Color};
`;
const Time = styled.p`
  color: ${Color};
`;
const AvatarStyle = {
  height: 60,
  width: 60,
  marginRight: 15
};

class CandidateDetail extends React.PureComponent {
  formatResumeEducation = edus => {
    const edu = edus.sort((a, b) => {
      return +new Date(b.endDate || 0) - +new Date(a.endDate || 0);
    });
    return edu[0];
  };
  render() {
    const { resume, intl, member } = this.props;
    const edu = this.formatResumeEducation(
      JSON.parse(JSON.stringify(resume.educations))
    );
    return (
      <React.Fragment>
        <Wrap>
          <NavWrap>
            <UserAvatar
              fileMetaId={
                resume.user.avatars &&
                resume.user.avatars.length > 0 &&
                resume.user.avatars[0].fileMeta
              }
              avatarStyle={AvatarStyle}
            />
            <NavTitle>
              <h2>{resume.user.username}</h2>
              <p style={{ color: Color, fontSize: FontSize }}>
                {resume.workExperieneYears}{' '}
                {intl.formatMessage({
                  id: 'display_resume_year_of_work_experience'
                })}
                {member && (
                  <span>
                    ·{member.age}{' '}
                    {intl.formatMessage({ id: 'display_resume_year_old' })}{' '}
                  </span>
                )}
                {edu && (
                  <span>
                    ·{edu.school}·{edu.fieldOfStudy}
                  </span>
                )}
              </p>
            </NavTitle>
          </NavWrap>

          <NavIntroduction>{resume.introduction}</NavIntroduction>

          <ContactInformation>
            <MdPhone />
            <span>{resume.user.email}</span>
          </ContactInformation>

          <ContactInformation>
            <FaRegEnvelope />
            <span>{resume.user.phone}</span>
          </ContactInformation>
        </Wrap>

        {/* <DetailStatusbar
          intl={intl}
        /> */}

        <Wrap>
          <Title>
            {intl.formatMessage({ id: 'display_resume_job_posts' })}
          </Title>
          <p style={{ fontSize: FontSize }}>{resume.title}</p>
        </Wrap>

        {resume.tags.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({ id: 'display_resume_job_keywords' })}
            </Title>
            {resume.tags.map((v, i) => {
              if (i + 1 === resume.tags.length) {
                return <span style={{ fontSize: FontSize }}>{v.text}</span>;
              } else {
                return <span style={{ fontSize: FontSize }}>{v.text}丶</span>;
              }
            })}
          </Wrap>
        )}

        {resume.educations.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({
                id: 'display_resume_education_experience'
              })}
            </Title>
            {resume.educations.map(v => (
              <React.Fragment>
                <div>
                  <p style={{ fontSize: FontSize, color: '#000' }}>
                    {v.schooeducationLevell}
                  </p>
                  <div>
                    <School>{v.educationLevel.name[intl.locale]}</School>
                    <Subject>{v.fieldOfStudy}</Subject>
                  </div>
                  <Time>
                    {moment(v.startDate).format('YYYY-MM')} -{' '}
                    {moment(v.endDate).format('YYYY-MM')}
                  </Time>
                </div>
              </React.Fragment>
            ))}
          </Wrap>
        )}

        {resume.workExperiences.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({ id: 'display_resume_work_experience' })}
            </Title>
            {resume.workExperiences.map(v => (
              <React.Fragment>
                <p
                  style={{
                    fontSize: FontSize,
                    paddingBottom: '5px',
                    margin: 0,
                    color: Color
                  }}
                >
                  {v.company}
                </p>
                <p
                  style={{
                    fontSize: FontSize,
                    paddingBottom: '5px',
                    margin: 0,
                    color: Color
                  }}
                >
                  {v.title}
                </p>
                <Time>
                  {moment(v.startDate).format('YYYY-MM')} -{' '}
                  {moment(v.endDate).format('YYYY-MM')}
                </Time>
                <div
                  style={{
                    color: Color,
                    fontSize: '14px',
                    paddingBottom: '15px'
                  }}
                >
                  {v.description}
                </div>
              </React.Fragment>
            ))}
          </Wrap>
        )}

        {resume.works.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({ id: 'display_resume_works_website' })}
            </Title>

            {resume.works.map(v => (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2FB998',
                    fontSize: '16px',
                    paddingBottom: '15px'
                  }}
                  href={v.url}
                >
                  {/* eslint-disable-next-line */}
                  {v.url.replace(/^(https|http)?\:\/\//i, '')}
                </a>
              </p>
            ))}
          </Wrap>
        )}
        {resume.skills.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({ id: 'display_resume_master_a_skill' })}
            </Title>
            {resume.skills.map((v, i) => {
              if (i + 1 === resume.skills.length) {
                return (
                  <span style={{ fontSize: FontSize }}>
                    {v.skill.name[intl.locale]}
                  </span>
                );
              } else {
                return (
                  <span style={{ fontSize: FontSize }}>
                    {v.skill.name[intl.locale]}丶
                  </span>
                );
              }
            })}
          </Wrap>
        )}
        {resume.otherSkills && resume.otherSkills.length > 0 && (
          <Wrap>
            <Title>
              {intl.formatMessage({ id: 'display_resume_other_skill' })}
            </Title>
            {resume.otherSkills.map((v, i) => {
              if (i + 1 === resume.otherSkills.length) {
                return <span style={{ fontSize: FontSize }}>{v}</span>;
              } else {
                return <span style={{ fontSize: FontSize }}>{v}丶</span>;
              }
            })}
          </Wrap>
        )}
      </React.Fragment>
    );
  }
}

export default CandidateDetail;
