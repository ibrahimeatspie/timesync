import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import { format } from "date-fns";

export function CalendarCustomize() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [numDays, setNumDays] = useState(5);
  const [minTime, setMinTime] = useState(8);
  const [maxTime, setMaxTime] = useState(22);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (newSchedule: any) => {
    setSchedule(newSchedule);
  };

  const handleMinTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinTime = parseInt(e.target.value, 10);
    if (newMinTime >= 1 && newMinTime < maxTime && newMinTime <= 24) {
      setMinTime(newMinTime);
    }
  };

  const handleMaxTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxTime = parseInt(e.target.value, 10);
    if (newMaxTime >= 1 && newMaxTime <= 24 && newMaxTime > minTime) {
      setMaxTime(newMaxTime);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <label className="block">
            Start Date : 
            <input
              className="border rounded-sm px-2"
              type="date"
              value={format(startDate, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label className="block">
            Num Days:
            <input
              className="border rounded-sm px-2"
              type="number"
              value={numDays}
              onChange={(e) => setNumDays(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div>
          <label className="block">
            Min Time:
            <input
              className="border rounded-sm px-2"
              type="number"
              value={minTime}
              onChange={handleMinTimeChange}
            />
          </label>
        </div>

        <div>
          <label className="block">
            Max Time:
            <input
              className="border rounded-sm px-2"
              type="number"
              value={maxTime}
              onChange={handleMaxTimeChange}
            />
          </label>
        </div>
      </div>
      <ScheduleSelector
        selection={schedule}
        numDays={numDays}
        minTime={minTime}
        maxTime={maxTime}
        hourlyChunks={2}
        startDate={startDate}
        onChange={handleChange}
      />
    </div>
  );
}
