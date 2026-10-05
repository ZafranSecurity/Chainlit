import { IThread } from 'src/types';

// The other group labels are hardcoded English, and ThreadList sorts the month
// groups by parsing English month names, so never follow the browser locale here.
const GROUP_LABEL_LOCALE = 'en-US';

export const groupByDate = (data: IThread[]) => {
  const groupedData: { [key: string]: IThread[] } = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .forEach((item) => {
      const threadDate = new Date(item.createdAt);
      threadDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - threadDate.getTime()) / 86400000
      );
      let category: string;
      if (daysDiff === 0) {
        category = 'Today';
      } else if (daysDiff === 1) {
        category = 'Yesterday';
      } else if (daysDiff <= 7) {
        category = 'Previous 7 days';
      } else if (daysDiff <= 30) {
        category = 'Previous 30 days';
      } else {
        category = threadDate.toLocaleString(GROUP_LABEL_LOCALE, {
          month: 'long',
          year: 'numeric'
        });
      }

      groupedData[category] ??= [];
      groupedData[category].push(item);
    });

  return groupedData;
};
