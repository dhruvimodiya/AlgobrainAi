import React, { useState } from "react";
import Joyride from "react-joyride";

function Task4() {
  const [{ run, setps }, setState] = useState({
    run: true,
    setps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong>Skip</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Here is first steps!</h2>,
        placement: "bottom",
        target: "#step-1",
        title: "First step",
      },
      {
        content: <h2>Here is second steps!</h2>,
        placement: "bottom",
        target: "#step-2",
        title: "First step",
      },
      {
        content: <h2>Here is thired steps!</h2>,
        placement: "bottom",
        target: "#step-3",
        title: "First step",
      },
      {
        content: <h2>Here is four steps!</h2>,
        placement: "bottom",
        target: "#step-4",
        title: "First step",
      },
      {
        content: <h2>Here is five steps!</h2>,
        placement: "bottom",
        target: "#step-5",
        title: "First step",
      },
      {
        content: <h2>Here is six steps!</h2>,
        placement: "bottom",
        target: "#step-6",
        title: "First step",
      },
    ],
  });
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <Joyride
        continuous
        callback={() => {}}
        run={run}
        steps={setps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#fff",
            beaconSize: 36,
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#f04",
            spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            textColor: "#333",
            width: 400,
            zIndex: 100,
          },
        }}
      />
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div
            key={item}
            id={`step-${item}`}
            style={{
              border: "1px  solid black",
              backgroundColor: "pink",
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Task4;
