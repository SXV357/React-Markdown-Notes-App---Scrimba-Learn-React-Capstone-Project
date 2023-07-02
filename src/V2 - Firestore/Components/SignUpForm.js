import React, {useState} from 'react'
import {Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';