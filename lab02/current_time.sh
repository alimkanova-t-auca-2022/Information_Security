#!/bin/bash

current_hour=$(date +%H)
current_minute=$(date +%M)
work_end_hour=17
work_end_minute=0

if [ "$current_hour" -ge "$work_end_hour" ];
then echo "Current time: $current_hour:$current_minute. The workday has already ended."
	exit 0
fi

remaining_hours=$((work_end_hour - current_hour))
remaining_minutes=$((work_end_minute - current_minute))

if [$remaining_minutes -lt 0 ];
then remaining_minutes=$((remaining_minutes + 60))
	remaining_hours=$((remaining_hpurs - 1))
fi

echo "Current  time: $current_hour:$current_minute. Workday end after $remaining_hours hours and $remaining_minutes minutes."
