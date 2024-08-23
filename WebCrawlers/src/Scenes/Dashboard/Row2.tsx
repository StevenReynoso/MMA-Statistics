// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import DashboardBox from "@/Components/DashboardBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMediaQuery } from "@mui/material";
import "./styles.css";
import {
  useGetFightersQuery,
  useGetFightsQuery,
  useGetKpisQuery,
} from "@/State/api";
import { useState, useEffect, useRef } from "react";
import Row1 from "./Row1";

type Props = {
  setActiveId: (id: number) => void;
  setId: (id: number) => void;
};

const Row2 = (props: Props) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const { data: fightsData } = useGetFightsQuery();
  const { data: fightersData } = useGetFightersQuery();
  const { data: kpisData } = useGetKpisQuery();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number>(0);
  const [Id, setId] = useState<number>(0);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedFighterNames, setSelectedFighterNames] = useState<{
    red: string;
    blue: string;
  } | null>(null);
  const [tempselectedFighterNames, setTempSelectedFighterNames] = useState<{
    red: string;
    blue: string;
  } | null>(null);
  const [selectedFighterNick, setSelectedFighterNick] = useState<{
    red: string;
    blue: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleBoxClick = (
    id: number,
    redName: string,
    redNick: string,
    blueName: string,
    blueNick: string
  ) => {
    setSelectedFighterNames({
      red: redName + " " + redNick.trim(),
      blue: blueName + " " + blueNick.trim(),
    });
    setExpandedId((prevId) => (prevId === id ? null : id));
    setTempSelectedFighterNames({ red: redName, blue: blueName });
    setSelectedFighterNick({ red: redNick, blue: blueNick });

    // Pass the red and blue fighter names along with the ID to Row3
  };

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD") // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/["']/g, "") // Remove single and double quotation marks
      .toLowerCase(); // Convert to lowercase
  };

  const renderExpandedContent = (event: never) => {
    if (!selectedFighterNames) return null;
    if (!tempselectedFighterNames) return null;
    let selectedRedFighter: {
      Fighter_ID: never;
      Ht: { [x: string]: never };
      Wt: { [x: string]: never };
      Reach: never;
      Stance: never;
    };
    let selectedBlueFighter: {
      Fighter_ID: never;
      Ht: { [x: string]: never };
      Wt: { [x: string]: never };
      Reach: never;
      Stance: never;
    };

    const nickFix = (str: string) => {
      return str.replace(/[""]/g, "");
    };

    const red = fightersData.filter((fighter: unknown) => {
      const fullName = normalizeString(
        `${fighter.First || ""} ${fighter.Last || ""}`
      ).trim();
      const selectedRedName = normalizeString(
        tempselectedFighterNames.red
      ).trim();
      return fullName === selectedRedName;
    });

    if (red.length > 1 && red.length != 0) {
      for (let i = 0; i < red.length; i++) {
        const fighter = red[i];
        if (
          nickFix(selectedFighterNick?.red ?? "").trim() === fighter.Nickname
        ) {
          selectedRedFighter = fighter;
          break;
        }
      }
    } else {
      selectedRedFighter = red[0];
    }

    //if(!redFighter) return null;

    const redStats = selectedRedFighter
      ? kpisData.find(
          (stat: any) => stat.Fighter_ID === selectedRedFighter.Fighter_ID
        )
      : null;

    const blue = fightersData.filter((fighter: any) => {
      const fullName = normalizeString(
        `${fighter.First || ""} ${fighter.Last || ""}`
      ).trim();
      const selectedRedName = normalizeString(
        tempselectedFighterNames.blue
      ).trim();
      return fullName === selectedRedName;
    });

    if (blue.length > 1 && blue.length != 0) {
      for (let i = 0; i < blue.length; i++) {
        const fighter = blue[i];
        if (nickFix(selectedFighterNick?.blue).trim() === fighter.Nickname) {
          selectedBlueFighter = fighter;
          break;
        }
      }
    } else {
      selectedBlueFighter = blue[0];
    }

    //if(!blueFighter) return null;
    const blueStats = selectedBlueFighter
      ? kpisData.find(
          (stat: any) => stat.Fighter_ID === selectedBlueFighter.Fighter_ID
        )
      : null;

    // Render red fighter stats
    const redStat = () => {
      if (selectedRedFighter && redStats) {
        const r_Stats = [
          { Record: redStats.W + "-" + redStats.L + "-" + redStats.D },
          { Height: selectedRedFighter.Ht[""] },
          { Weight: selectedRedFighter.Wt[""] },
          { Reach: selectedRedFighter.Reach },
          { Stance: selectedRedFighter.Stance },
        ];
        return (
          <div>
            {r_Stats.map((r_stat, index) => (
              <p key={index}>{Object.values(r_stat)}</p>
            ))}
          </div>
        );
      } else {
        return <p>Red Fighter Not found</p>;
      }
    };

    // Render blue fighter stats
    const blueStat = () => {
      if (selectedBlueFighter && blueStats) {
        const b_Stats = [
          { Record: blueStats.W + "-" + blueStats.L + "-" + blueStats.D },
          { Height: selectedBlueFighter.Ht[""] },
          { Weight: selectedBlueFighter.Wt[""] },
          { Reach: selectedBlueFighter.Reach },
          { Stance: selectedBlueFighter.Stance },
        ];
        return (
          <div>
            {b_Stats.map((b_stat, index) => (
              <p key={index}>{Object.values(b_stat)}</p>
            ))}
          </div>
        );
      } else {
        return <p>Blue Fighter Not found</p>;
      }
    };

    return (
      <div
        className="additional-stats"
        style={{
          fontSize: isSmallScreen ? "0.8em" : "",
          marginBottom: isSmallScreen ? "" : "15em",
        }}
      >
        <div
          className="red-stats-column"
          style={{ marginTop: isSmallScreen ? "inherit" : "" }}
        >
          {redStat()}
        </div>
        <div
          className="label-column"
          style={{
            fontSize: isSmallScreen ? "0.8em" : "",
          }}
        >
          Record
          <div>Height</div>
          <div>Weight</div>
          <div>Reach</div>
          <div>Stance</div>
        </div>
        <div className="blue-stats-column">{blueStat()}</div>
      </div>
    );
  };

  useEffect(() => {
    setExpandedId(null);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeId]);

  return (
    <>
      <Row1 setActiveId={setActiveId} />
      <DashboardBox gridArea="b">
        <div
          ref={containerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1fr , 1fr)",
            overflow: "auto",
            maxHeight: "100%",
          }}
        >
          {fightsData &&
            fightsData.map(
              (event: EventType, index: number) =>
                activeId === event.ID && (
                  <div
                    key={index}
                    onClick={() =>
                      handleBoxClick(
                        event.Fight_Num,
                        event.Red_Fighter_Name,
                        event.Red_Fighter_Nickname,
                        event.Blue_Fighter_Name,
                        event.Blue_Fighter_Nickname
                      )
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`event-container ${
                      expandedId === event.Fight_Num ? "expanded" : ""
                    }`}
                    style={{
                      justifyContent: isSmallScreen ? "flex-start" : "",
                    }}
                  >
                    <div
                      className="red-fighter-info"
                      style={{
                        display: isSmallScreen ? "inline" : "grid",
                        textAlign: isSmallScreen ? "center" : "",
                        fontSize: isSmallScreen ? "0.8em" : "",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: isSmallScreen ? "center" : "",
                          fontSize: isSmallScreen ? "1.2em" : "",
                        }}
                      >
                        {event.Red_Fighter_Name}
                        <p
                          style={{
                            textAlign: isSmallScreen ? "center" : "",
                            fontSize: isSmallScreen ? "0.6em" : "",
                          }}
                        >
                          {event.Red_Fighter_Nickname}
                        </p>
                      </h2>


                      <img
                        src={event.Red_Event_fighter_image}
                        alt="Red Fighter"
                        style={{
                          width:
                            expandedId === event.Fight_Num
                              ? isSmallScreen
                                ? "100px"
                                : "auto"
                              : isSmallScreen
                              ? "105px"
                              : "185px",
                          height:
                            expandedId === event.Fight_Num
                              ? isSmallScreen
                                ? ""
                                : "600px"
                              : isSmallScreen
                              ? "100px"
                              : "150px", //'600px' : '150px',
                          objectFit:
                            expandedId === event.Fight_Num
                              ? "contain"
                              : "cover",
                          objectPosition: "center top",
                          marginLeft: "auto",
                          marginRight: "auto",
                          gridColumn: "2",
                          gridRow: "1",
                        }}
                      />
                    </div>

                    <div
                      className={`columnFlex ${
                        expandedId === event.Fight_Num ? "expanded" : ""
                      }`}
                      style={{
                        fontSize: isSmallScreen ? "0.8em" : "",
                        paddingBottom:
                          expandedId === event.Fight_Num
                            ? isSmallScreen
                              ? "0em"
                              : "2em"
                            : isSmallScreen
                            ? "6em"
                            : "2em",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: isSmallScreen ? "1.2em" : "",
                        }}
                      >
                        {event.Event_Weight}
                      </h4>
                      <h3
                        style={{
                          marginTop: "-12px",
                          fontSize: isSmallScreen ? "1.2em" : "",
                        }}
                      >
                        VS
                      </h3>
                      {expandedId === event.Fight_Num ? (
                        <ExpandMoreIcon style={{ visibility: "hidden" }} />
                      ) : (
                        <ExpandMoreIcon style={{ marginTop: "26px" }} />
                      )}
                    </div>

                    <div
                      className="blue-fighter-info"
                      style={{
                        display: isSmallScreen ? "inline" : "grid",
                        textAlign: isSmallScreen ? "center" : "right",
                        fontSize: isSmallScreen ? "0.8em" : "",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: isSmallScreen ? "center" : "right",
                          fontSize: isSmallScreen ? "1.2em" : "",
                        }}
                      >
                        {event.Blue_Fighter_Name}
                        <p
                          style={{
                            textAlign: isSmallScreen ? "center" : "right",
                            fontSize: isSmallScreen ? "0.6em" : "",
                          }}
                        >
                          {event.Blue_Fighter_Nickname}
                        </p>
                      </h2>

                      <img
                        src={event.Blue_Event_fighter_image}
                        alt="Blue Fighter"
                        style={{
                          width:
                            expandedId === event.Fight_Num
                              ? isSmallScreen
                                ? "100px"
                                : "auto"
                              : isSmallScreen
                              ? "105px"
                              : "185px",
                          height:
                            expandedId === event.Fight_Num
                              ? isSmallScreen
                                ? ""
                                : "600px"
                              : isSmallScreen
                              ? "100px"
                              : "150px", //'600px' : '150px',
                          objectFit:
                            expandedId === event.Fight_Num
                              ? "contain"
                              : "cover",
                          objectPosition: "center top",
                          marginLeft: "auto",
                          marginRight: "auto",
                          gridColumn: "2",
                          gridRow: "1",
                        }}
                      />

                    </div>
                    {expandedId === event.Fight_Num &&
                      renderExpandedContent(event)}

                    {expandedId === event.Fight_Num && (
                      <ExpandLessIcon
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          gridColumn: "2",
                        }}
                      />
                    )}
                  </div>
                )
            )}
        </div>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <p className="rowC">
          Octagon Fight Data isn't endorsed by UFC and doesn't reflect the views
          or opinions of the UFC or anyone officially involved in producing or
          managing UFC. UFC are trademarks or registered trademarks of the UFC,
          Inc.
        </p>
      </DashboardBox>
    </>
  );
};

export default Row2;
