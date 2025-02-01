import styled from 'styled-components';
import { useCustomStore } from '../../state-management/userCustom-store';

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  height: 250px;
	word-wrap: break-word;    /* 텍스트가 넘치지 않도록 줄바꿈 */
  overflow-wrap: break-word;
`;

const AvatarPic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
	word-wrap: break-word;    /* 텍스트가 넘치지 않도록 줄바꿈 */
  overflow-wrap: break-word; /* 텍스트가 넘치지 않도록 줄바꿈 */
  word-break: break-all;  /* 단어가 길 때 자동으로 분리하여 줄바꿈 */
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const UserDetail = styled.p`
  margin: 5px 0;
  font-size: 18px;
`;

export default function IDPreview() {
	const { userProfile } = useCustomStore();

	return (
		<PreviewContainer>
			<AvatarPic>
				<StyledImg src="path_to_avatar_image.jpg" alt="avatar" />
			</AvatarPic>
			<UserInfo>
				<StyledH1>{userProfile.name || "N/A"}</StyledH1>
				<UserDetail><strong>Gender:</strong> {userProfile.gender || "N/A"}</UserDetail>
				<UserDetail><strong>Location:</strong> {userProfile.location || "N/A"}</UserDetail>
				<UserDetail><strong>Bio:</strong> {userProfile.bio || "N/A"}</UserDetail>
				<UserDetail><strong>User ID:</strong> {userProfile.serialNum || "N/A"}</UserDetail>
			</UserInfo>
		</PreviewContainer>
	);
}
