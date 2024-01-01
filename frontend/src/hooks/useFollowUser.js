// useFollowUser.js
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const useFollowUser = (initialFollowingStatus, userId) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(initialFollowingStatus);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'Please login to follow', 'error');
      return;
    }

    if (updating) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      if (following) {
        showToast('Success', `Unfollowed ${user.name}`, 'success');
        user.followers.pop(); // simulate removing from followers
      } else {
        showToast('Success', `Followed ${user.name}`, 'success');
        user.followers.push(currentUser?._id); // simulate adding to followers
      }

      setFollowing(!following);
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setUpdating(false);
    }
  };

  return { following, updating, handleFollowUnfollow };
};

export default useFollowUser;
