import React from 'react'
import './Skeleton.css'

export default function Skeleton() {
    return (
        <div class="Skeleton-Container">
            <div class="col-sm-6 col-md-3">
                <div class="movie--isloading">
                    <div class="loading-image"></div>
                    <div class="loading-content">
                        <div class="loading-text-container">
                            <div class="loading-main-text"></div>
                            <div class="loading-sub-text"></div>
                        </div>
                        <div class="loading-btn"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
