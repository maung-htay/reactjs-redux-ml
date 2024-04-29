import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import PropTypes from "prop-types";

Chart.register(...registerables);

function MyChartComponent({ data, options, type }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: type, // or 'bar', 'pie', bubble, etc.
      data: data,
      options: options,
    });

    // Cleanup function to be called when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, options]); // Recreate the chart whenever data or options change

  return <canvas ref={canvasRef} className="dark:bg-blue-300" />;
}
MyChartComponent.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default MyChartComponent;
