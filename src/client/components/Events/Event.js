import Link from 'next/link';   
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner} from 'react-bootstrap';


const Event = ({data}) => {
    const {id, society, title, description, image, rating} = data;
    // TODO: fix backend
}