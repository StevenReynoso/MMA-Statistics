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
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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

  const [activeId, setActiveId] = useState<number>(0);
  const [Id, setId] = useState<number>(0);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const normalizeString = useCallback((str: string) => {
    return str
      .normalize("NFD") // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/["']/g, "") // Remove single and double quotation marks
      .toLowerCase(); // Convert to lowercase
  }, []);

  const handleBoxClick = useCallback(
    (
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
    },
    []
  );


  const filteredRedFighter = useMemo(() => {
    if (!fightersData || !tempselectedFighterNames || !selectedFighterNick)
      return null;

    const nickFix = (str: string) => str.replace(/[""]/g, "");

    const red = fightersData.filter((fighter: any) => {
      const fullName = normalizeString(
        `${fighter.First || ""} ${fighter.Last || ""}`
      ).trim();
      const selectedRedName = normalizeString(tempselectedFighterNames.red).trim();
      return fullName === selectedRedName;
    });

    return red.length > 1
      ? red.find(
          (fighter: any) =>
            nickFix(selectedFighterNick.red).trim() === fighter.Nickname
        )
      : red[0];
  }, [fightersData, tempselectedFighterNames, selectedFighterNick, normalizeString]);

  const filteredBlueFighter = useMemo(() => {
    if (!fightersData || !tempselectedFighterNames || !selectedFighterNick)
      return null;

    const nickFix = (str: string) => str.replace(/[""]/g, "");

    const blue = fightersData.filter((fighter: any) => {
      const fullName = normalizeString(
        `${fighter.First || ""} ${fighter.Last || ""}`
      ).trim();
      const selectedBlueName = normalizeString(tempselectedFighterNames.blue).trim();
      return fullName === selectedBlueName;
    });

    return blue.length > 1
      ? blue.find(
          (fighter: any) =>
            nickFix(selectedFighterNick.blue).trim() === fighter.Nickname
        )
      : blue[0];
  }, [fightersData, tempselectedFighterNames, selectedFighterNick, normalizeString]);

  // Render stats memoized
  const renderStats = useCallback((fighter: any, stats: any) => {
    if (!fighter || !stats) return <p>Fighter Not Found</p>;

    const fighterStats = [
      { Record: stats.W + "-" + stats.L + "-" + stats.D },
      { Height: fighter.Ht[""] },
      { Weight: fighter.Wt[""] },
      { Reach: fighter.Reach },
      { Stance: fighter.Stance },
    ];

    return (
      <div>
        {fighterStats.map((stat, index) => (
          <p key={index}>{Object.values(stat)}</p>
        ))}
      </div>
    );
  }, []);

  // Expanded content rendering
  const renderExpandedContent = useCallback(() => {
    if (!filteredRedFighter || !filteredBlueFighter) return null;

    const redStats = kpisData?.find(
      (stat: any) => stat.Fighter_ID === filteredRedFighter.Fighter_ID
    );
    const blueStats = kpisData?.find(
      (stat: any) => stat.Fighter_ID === filteredBlueFighter.Fighter_ID
    );

    return (
      <div className="additional-stats" style={{ fontSize: isSmallScreen ? "0.8em" : "" }}>
        <div className="red-stats-column">{renderStats(filteredRedFighter, redStats)}</div>
        <div className="label-column">
          Record
          <div>Height</div>
          <div>Weight</div>
          <div>Reach</div>
          <div>Stance</div>
        </div>
        <div className="blue-stats-column">{renderStats(filteredBlueFighter, blueStats)}</div>
      </div>
    );
  }, [filteredRedFighter, filteredBlueFighter, kpisData, isSmallScreen, renderStats]);

  useEffect(() => {
    setExpandedId(null);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [setActiveId]);
  
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
                    className={`event-container ${expandedId === event.Fight_Num ? "expanded" : ""
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
                      className={`columnFlex ${expandedId === event.Fight_Num ? "expanded" : ""
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
