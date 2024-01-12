import classes from "./FilterBar.module.css";
import {
  EventType,
  Cities,
  type Event,
  OrderBy,
  SortOrder,
} from "../util/Types";
import { useRef } from "react";
import { getUserData } from "../util/Methods";

type FilterBarProps = {
  initialEvents: Array<Event>;
  updateEvents: (events: Array<Event>) => void;
};

type FilterFields = {
  search: string;
  type: string;
  city: string;
  orderBy: string;
  sorting: string;
};

const eventFiltersInitialState: FilterFields = {
  search: "",
  type: "",
  city: getUserData()?.city || "",
  orderBy: OrderBy.POST_DATE,
  sorting: SortOrder.ASCENDING,
};

export default function FilterBar({
  initialEvents,
  updateEvents,
}: FilterBarProps) {
  const eventFilters = useRef(eventFiltersInitialState);

  function updateFilters(field: string, value: string) {
    eventFilters.current = {
      ...eventFilters.current,
      [field]: value,
    };
  }

  function handleFilterChange(field: string, value: string) {
    updateFilters(field, value);

    //Perform filtering on the events array
    const curFields = eventFilters.current;
    const events = initialEvents.filter(
      (event) =>
        event.title.includes(curFields.search) &&
        event.eventType.includes(curFields.type)
    );

    //order {sort order} by {order by}
    let fieldToSortBy: string;

    if (curFields.orderBy === OrderBy.LIKES) {
      fieldToSortBy = "";
    }

    updateEvents(events);
  }

  return (
    <div className={classes.mainDivFilterBar}>
      <p>
        <label className={classes.labelItem}>Cautare</label>
        <input
          className={classes.inputItem}
          onChange={(event) => handleFilterChange("search", event.target.value)}
        />
      </p>
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
        >
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
