import React from "react";
import PropTypes from 'prop-types'

const InlineError = ({ text }) => {
	return <label style={{ color: "red", display: "block" }}>{text}</label>;
};

InlineError.propTypes = {
    text: PropTypes.string.isRequired
}

export default InlineError;
