const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options={year:'numeric' as const, month:'short' as const};
    return date.toLocaleString('en-US', options);
}
function timeAgo(time:string) {
  const now = new Date();
  const postDate = new Date(time);
  const diff=now.getTime()-postDate.getTime();
  const seconds = Math.floor(diff/ 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

const getBase64=(file:any)=>{
        return new Promise((resolve, reject)=>{
            const reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>resolve(reader.result);
            reader.onerror=(error)=>reject(error);
        });
    };

export {formatDate,timeAgo, getBase64}