import classes from "./FilterBar.module.css";
import {
  EventType,
  Cities,
  type Event,
  OrderBy,
  SortOrder,
  HomePageEvent,
} from "../util/Types";
import { useRef, useEffect } from "react";
import { getUserData } from "../util/Methods";

type FilterBarProps = {
  initialEvents: Array<HomePageEvent>;
  updateEvents: (events: Array<HomePageEvent>) => void;
};

type FilterFields = {
  search: string;
  type: string;
  city: string;
  orderBy: string;
  sorting: string;
};

export default function FilterBar({
  initialEvents,
  updateEvents,
}: FilterBarProps) {
  const eventFiltersInitialState: FilterFields = {
    search: "",
    type: "",
    city: getUserData()?.city || "",
    orderBy: OrderBy.DATE,
    sorting: SortOrder.DESCENDING,
  };

  const eventFilters = useRef(eventFiltersInitialState);

  //Trigger default filtering
  useEffect(() => {
    const updatedEvents = filterEvents();
    updateEvents(updatedEvents);
  }, []);

  function updateFilters(field: string, value: string) {
    eventFilters.current = {
      ...eventFilters.current,
      [field]: value,
    };
  }

  function filterEvents(): Array<HomePageEvent> {
    const curFields = eventFilters.current;
    console.log(curFields);
    let events = initialEvents.filter(
      (event) =>
        event.title.includes(curFields.search) &&
        event.eventType.includes(curFields.type) &&
        event.city.includes(curFields.city)
    );

    //order {sort order} by {order by}
    let fieldToSortBy: string;

    if (curFields.orderBy === OrderBy.LIKES) {
      fieldToSortBy = "likesCount";
    } else if (curFields.orderBy === OrderBy.PARTICIPANTS) {
      fieldToSortBy = "participantsCount";
    } else {
      fieldToSortBy = "date";
    }

    if (curFields.sorting === SortOrder.ASCENDING) {
      events = events.sort((e1, e2) => e1[fieldToSortBy] - e2[fieldToSortBy]);
    } else {
      events = events.sort((e1, e2) => e2[fieldToSortBy] - e1[fieldToSortBy]);
    }

    return events;
  }

  function handleFilterChange(field: string, value: string) {
    updateFilters(field, value);

    const updatedEvents = filterEvents();
    updateEvents(updatedEvents);
  }

  return (
    <div className={classes.mainDivFilterBar}>
      <div>
        <label style={{marginLeft:'10px'}} className={classes.labelItem}>Cautare</label>
        <input style={{width:'100%'}}
          className={classes.inputItem}
          onChange={(event) => handleFilterChange("search", event.target.value)}
        />
      </div>
      <p>
        <label className={classes.labelItem}>Tip</label>
        <select
          className={classes.dropdown}
          onChange={(event) => handleFilterChange("type", event.target.value)}
        >
          <option key="Toate" value="">
            Toate
          </option>
          {Object.values(EventType).map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label className={classes.labelItem}>Oras</label>
        <select
          className={classes.dropdown}
          onChange={(event) => handleFilterChange("city", event.target.value)}
          defaultValue={getUserData()?.city || ""}
        >
          <option key={"Toate"} value={""}>
            Toate
          </option>
          {Object.values(Cities).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label className={classes.labelItem}>Ordonare dupa</label>
        <select
          className={classes.dropdown}
          onChange={(event) =>
            handleFilterChange("orderBy", event.target.value)
          }
        >
          {Object.values(OrderBy).map((ob) => (
            <option key={ob} value={ob}>
              {ob}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label className={classes.labelItem}>Sortare</label>
        <select
          className={classes.dropdown}
          onChange={(event) =>
            handleFilterChange("sorting", event.target.value)
          }
          defaultValue={SortOrder.DESCENDING}
        >
          {Object.values(SortOrder).map((sortOrder) => (
            <option key={sortOrder} value={sortOrder}>
              {sortOrder}
            </option>
          ))}
        </select>
      </p>

      <button className={classes.btnFiltrare}>Resetare</button>
    </div>
  );
}
