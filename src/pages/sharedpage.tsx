import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setProgress, setSubject } from '@/store/subjectSlice';

function ShareLinkButton({ subjectId, subjectName, topicTitle }) {
  const handleShareClick = () => {
    const queryParams = queryString.stringify({
      subjectId,
      subjectName,
      topicTitle,
    });
    const sharedUrl = `${window.location.origin}/sharedpage?${queryParams}`;
    // Use sharedUrl for sharing
    console.log(sharedUrl);
  };

  return <button onClick={handleShareClick}>Share Link</button>;
}

export default function SharedPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { subjectId, subjectName, topicTitle } = router.query;

  // Update Redux state with the query parameters
  useEffect(() => {
    if (subjectId && subjectName) {
      dispatch(setSubject(
        {
          subjectId: subjectId,
          subjectName: subjectName,
        }));
      dispatch(setProgress(
        {
          topicTitle: "No topic"
        }))
    }
    if (topicTitle) {
      dispatch(setProgress(topicTitle));
    }
    // router.push('/learn');
  }, [dispatch, subjectId, subjectName, topicTitle]);

  return (
    <>
      <div>
        {subjectId} and {subjectName}
      </div>
    </>
  );
}

export { ShareLinkButton };