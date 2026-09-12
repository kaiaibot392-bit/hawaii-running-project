type Props = {
  error: boolean;
  loading: boolean;
  loadingLabel: string;
  emptyLabel: string;
};

/** Shared loading / empty / error slot so both views read identically. */
const ScheduleStatus = ({ error, loading, loadingLabel, emptyLabel }: Props) => {
  if (error) {
    return (
      <div className="py-16 border-y border-border text-center text-destructive">
        Couldn't load the schedule right now. Please try again later.
      </div>
    );
  }

  return (
    <div className="py-16 border-y border-border text-center text-muted-foreground">
      {loading ? loadingLabel : emptyLabel}
    </div>
  );
};

export default ScheduleStatus;
