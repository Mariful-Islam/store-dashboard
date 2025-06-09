import React, { useContext, useState, useMemo } from "react";
import Modal from "../Modal";
import Button from "../Button";
import Label from "../Label";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

interface SellFilterModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

interface DateOption {
  name: string;
  value: string;
  isRange?: boolean;
}

function SellFilterModal({ isOpen, onClose }: SellFilterModalProps) {
  const { handleClear } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const today = moment();
  const dateRanges: Record<string, moment.Moment> = {
    Yesterday: today.clone().subtract(1, "days"),
    "Last 7 days": today.clone().subtract(7, "days"),
    "Last 1 month": today.clone().subtract(30, "days"),
    "Last 2 months": today.clone().subtract(60, "days"),
    "Last 6 months": today.clone().subtract(180, "days"),
    "Last 1 year": today.clone().subtract(365, "days"),
  };

  const options: DateOption[] = useMemo(
    () => [
      {
        name: "Today",
        value: today.format("YYYY-MM-DD"),
      },
      {
        name: "Yesterday",
        value: dateRanges["Yesterday"].format("YYYY-MM-DD"),
      },
      {
        name: "Last 7 days",
        value: "7-days",
        isRange: true,
      },
      {
        name: "Last 1 month",
        value: "1-month",
        isRange: true,
      },
      {
        name: "Last 6 months",
        value: "6-months",
        isRange: true,
      },
      {
        name: "Last 1 year",
        value: "1-year",
        isRange: true,
      },
    ],
    []
  );

  const activeValue =
    searchParams.get("date") ||
    `${searchParams.get("start_date")}-${searchParams.get("end_date")}`;

  const handleSelect = (opt: DateOption) => {
    if (opt.isRange) {
      setSelectedOption(null);
      const endDate = today.format("YYYY-MM-DD");
      const startDate = dateRanges[opt.name].format("YYYY-MM-DD");

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("date", "");
        params.set("month", "")
        params.set("start_date", endDate);
        params.set("end_date", startDate);
        return params;
      });
    } else {
      setSelectedOption(opt.value);
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("start_date", "");
        params.set("end_date", "");
        params.set("month", "")
        params.set("date", opt.value);

        return params;
      });
    }
  };

  const handleApply = () => {
    if (selectedOption) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("start_date", "");
        params.set("end_date", "");
        params.set("month", "")
        params.set("date", selectedOption);
        return params;
      });
    }
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (name === "date") {
        params.set("date", value);
        params.set("start_date", "");
        params.set("end_date", "");
        params.set("month", "");


      } else if (name === "month"){
        params.set("date", "");
        params.set("start_date", "");
        params.set("end_date", "");
        params.set(name, value);

      }
       else {
        params.set("date", "");
        params.set("month", "");

        params.set(name, value);

      }
      return params;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sales Filter">
      <form className="mt-6">
        <div className="flex justify-end"></div>

        <div className="flex gap-12 justify-between mt-4">
          <div>
            <h3 className="font-bold">Select Date</h3>
            <ul className="mt-4">
              {options.map((opt, i) => {
                const isActive = opt.isRange
                  ? `${today.format("YYYY-MM-DD")}-${dateRanges[
                      opt.name
                    ].format("YYYY-MM-DD")}` === activeValue
                  : opt.value === activeValue;

                return (
                  <li
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`text-nowrap rounded-md cursor-pointer duration-150 pl-2 pr-4 py-1 hover:bg-gray-100 ${
                      isActive ? "bg-gray-200 " : ""
                    }`}
                  >
                    {opt.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-center">Date Range</h3>
            <div className="flex gap-4 mt-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={searchParams.get("start_date") || ""}
                  onChange={onChange}
                  className="w-full py-1 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={searchParams.get("end_date") || ""}
                  onChange={onChange}
                  className="w-full py-1 rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="mt-4">
                <Label htmlFor="date">Pick Date</Label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={searchParams.get("date") || ""}
                  onChange={onChange}
                  className="w-full py-1 rounded-md"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="month">Select Month</Label>
                <input
                  id="month"
                  name="month"
                  type="month"
                  value={searchParams.get("month") || ""}
                  onChange={onChange}
                  className="w-full py-1 rounded-md"
                />
              </div>


      
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleClear}
            type="button"
            className="text-red-500 font-medium cursor-pointer text-sm hover:underline"
          >
            Clear Filter
          </button>

          <div className="flex justify-end gap-4 ">
            <Button btntype="DangerOutline" onClick={onClose}>
              Cancel
            </Button>
            <Button btntype="Normal" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SellFilterModal;
