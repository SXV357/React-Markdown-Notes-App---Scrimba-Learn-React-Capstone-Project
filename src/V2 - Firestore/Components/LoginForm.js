import React, {useState} from 'react'
import {Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';