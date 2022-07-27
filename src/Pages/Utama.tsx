import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap'
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

type todoCollection = {
    tugas: string,
    batas: string,
    tanggal: string,
    selesai: boolean,
    id: string
}

export default function Utama() {
    const [ Tugas, setTugas ] = useState<{tugas?: string, batas?: string}>({
        tugas: "",
        batas: ""
    });
    const [ TugasList, setTugasList ] = useState<todoCollection[]>([]);
    const [ TunjukkinEditModal, setTunjukkinEditModal ] = useState<{hidup: boolean, id?: string, tugas?: string}>({hidup: false});

    const todoCollection = collection(db, "todo");

    const dapatinTodo = async () => {
        const data = await getDocs(todoCollection)
        setTugasList(data.docs.map((doc) => {
            return {...{tugas: "", batas: "", tanggal: "", selesai: false, id: doc.id},...doc.data()}
        }));
    }

    const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (document.getElementById('tugas') as HTMLInputElement)!.value = "";

        const { tugas, batas } = Tugas;
        
        await addDoc(todoCollection, {
            tugas: tugas,
            selesai: false,
            tanggal: new Date().toISOString().split('T')[0],
            batas: batas
        });

        await dapatinTodo();
    }

    const updateTodo = async (formulir: {input: string, value: string | boolean}, id: string) => {
        console.log(formulir)
        await updateDoc(doc(db, "todo", id), {[formulir.input]: formulir.value});
        await dapatinTodo();
    }

    const hapusTodo = async(id: string) => {
        await deleteDoc(doc(db, "todo", id));
        await dapatinTodo();
    }

    const bukaModalEdit = (v: {tugas: string, id: string}) => {
        console.log(v);
        setTunjukkinEditModal({hidup: true, id: v.id, tugas: v.tugas});
    }

    useEffect(() => {
        dapatinTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setTugasList])

    const updateFormulir = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
        setTugas({
            ...Tugas,
            [input]: e.target.value
        })
        console.log(Tugas);
    }

    return (
        <>
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card" id="list1" style={{ borderRadius: "0.75rem", backgroundColor: "#eff1f2" }}>
                            <div className="card-body py-4 px-4 px-md-5">
                                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                    <i className="fas fa-check-square me-1"></i>
                                    <u>Keperluan saya</u>
                                </p>

                                <div className="pb-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <form className="d-flex flex-row align-items-center" onSubmit={(e) => SubmitHandler(e)}>
                                                <input type="text" className="form-control form-control-lg" style={{ border: "0", boxShadow: "none" }} id="tugas" name="tugas" placeholder="Tambah tugas" onChange={(e) => updateFormulir(e, "tugas")} />
                                                <div id="date-picker-example" className="md-form md-outline input-with-post-icon datepicker">
                                                    <input type="date" className="form-control" id="tanggal" name="tanggal" onChange={(e) => updateFormulir(e, "batas")} />
                                                </div>
                                                <div>
                                                    <Button variant="primary" type="submit">Tambah</Button>
                                                    {/* <button type="submit" className="btn btn-primary">Tambah</button> */}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="btn btn-primary">Refresh</button>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-start align-items-center mb-4 pt-2 pb-3">
                                    <p className="small mb-0 me-2 text-muted">Filter</p>
                                    <select className="select">
                                        <option value="1">All</option>
                                        <option value="2">Completed</option>
                                        <option value="3">Active</option>
                                        <option value="4">Has due date</option>
                                    </select>
                                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                                    <select className="select">
                                        <option value="1">Added date</option>
                                        <option value="2">Due date</option>
                                    </select>
                                    <a href="#!" style={{ color: "#23af89" }} data-mdb-toggle="tooltip" title="Ascending">
                                        <i className="fas fa-sort-amount-down-alt ms-2"></i>
                                    </a>
                                </div>


                                {TugasList.map((v) => {
                                    return (
                                        <ul className="list-group list-group-horizontal rounded-0 bg-transparent" id={v.id}>
                                            <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                                                <div className="form-check">
                                                    <input className="form-check-input me-0" type="checkbox" id="flexCheckChecked1" aria-label="..." onChange={(e) => updateTodo({input: "selesai", value: e.target.checked}, v.id)} defaultChecked={v.selesai} />
                                                </div>
                                            </li>
                                            <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                                <p className="lead fw-normal mb-0">{v.tugas}</p>
                                            </li>
                                            {v.batas &&
                                            <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                                                <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                                                    <p className="small mb-0">
                                                        <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                                                        <i className="fas fa-hourglass-half me-2 text-warning"></i>
                                                        </a>
                                                        {v.batas}
                                                    </p>
                                                </div>
                                            </li>
                                            }
                                            <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                                <div className="d-flex flex-row justify-content-end mb-1">
                                                    <a href="#!" className="text-info" data-mdb-toggle="tooltip" title="Edit todo" onClick={() => {bukaModalEdit(v)}}><i className="fas fa-pencil-alt me-3"></i></a>
                                                    <a href="#!" className="text-danger" data-mdb-toggle="tooltip" title="Delete todo" onClick={() => hapusTodo(v.id)}><i className="fas fa-trash-alt"></i></a>
                                                </div>
                                                <div className="text-end text-muted">
                                                    <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                                                        <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>{v.tanggal}</p>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Modal show={TunjukkinEditModal.hidup} onHide={() => setTunjukkinEditModal({hidup: false})}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" id="EditText" defaultValue={TunjukkinEditModal.tugas} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setTunjukkinEditModal({hidup: false}); updateTodo({input: "tugas", value: (document.getElementById('EditText') as HTMLInputElement).value}, TunjukkinEditModal.id!)}}>
                    Simpan
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
